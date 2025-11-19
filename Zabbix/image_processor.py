#!/usr/bin/env python3
"""
PhotoStock Image Processor
Фоновый скрипт для обработки изображений
"""

import os
import time
import logging
import random
from pathlib import Path
from datetime import datetime

# Настройка путей
QUEUE_DIR = Path("/var/photostock/queue")
PROCESSED_DIR = Path("/var/photostock/processed")
ERROR_LOG = Path("/var/log/photostock_errors.log")

# Создание директорий если их нет
QUEUE_DIR.mkdir(parents=True, exist_ok=True)
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
ERROR_LOG.parent.mkdir(parents=True, exist_ok=True)

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(ERROR_LOG),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

def simulate_processing(file_path):
    """
    Имитация обработки изображения
    В реальной системе здесь была бы настоящая обработка
    """
    try:
        # Имитация случайных ошибок (5% случаев)
        if random.random() < 0.05:
            raise Exception("CRITICAL: Failed to process image - corrupt file data")
        
        # Имитация времени обработки (1-3 секунды)
        processing_time = random.uniform(1, 3)
        time.sleep(processing_time)
        
        return True
    except Exception as e:
        logger.error(f"CRITICAL: {str(e)}")
        return False

def process_single_file(filename):
    """Обработка одного файла"""
    source_path = QUEUE_DIR / filename
    target_path = PROCESSED_DIR / f"processed_{filename}"
    
    try:
        logger.info(f"Processing file: {filename}")
        
        # Симуляция обработки
        success = simulate_processing(source_path)
        
        if success:
            # В реальной системе здесь было бы копирование/перемещение обработанного файла
            # Для демо просто создаем файл в processed
            target_path.touch()
            source_path.unlink()  # Удаляем из очереди
            logger.info(f"Successfully processed: {filename}")
        else:
            # Оставляем файл в очереди для повторной обработки
            logger.warning(f"Failed to process: {filename} - left in queue")
            
    except Exception as e:
        logger.error(f"CRITICAL: Unexpected error processing {filename}: {str(e)}")

def check_queue():
    """Проверка очереди на новые файлы"""
    try:
        files = list(QUEUE_DIR.glob("*"))
        # Фильтруем только файлы (не директории)
        files = [f for f in files if f.is_file()]
        return files
    except Exception as e:
        logger.error(f"CRITICAL: Cannot access queue directory: {str(e)}")
        return []

def main():
    """Основной цикл обработки"""
    logger.info("PhotoStock Image Processor started")
    
    while True:
        try:
            # Проверяем очередь
            queue_files = check_queue()
            
            if queue_files:
                logger.info(f"Found {len(queue_files)} files in queue")
                
                # Обрабатываем файлы по одному
                for file_path in queue_files[:5]:  # Ограничиваем batch size
                    process_single_file(file_path.name)
            
            # Пауза между проверками очереди
            time.sleep(5)
            
        except KeyboardInterrupt:
            logger.info("PhotoStock Image Processor stopped by user")
            break
        except Exception as e:
            logger.error(f"CRITICAL: Main loop error: {str(e)}")
            time.sleep(10)  # Пауза при критической ошибке

if __name__ == "__main__":
    main()

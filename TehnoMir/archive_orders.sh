#!/bin/bash
# Скрипт архивации заказов для интернет-магазина
# ВНИМАНИЕ: Этот скрипт создает высокую нагрузку на CPU для демонстрации проблем производительности

LOG_FILE="/var/log/archives/orders_archive.log"
ARCHIVE_DIR="/var/archives/orders"
TEMP_DIR="/tmp/archive_work"

# Создание директорий если не существуют
mkdir -p "$ARCHIVE_DIR" "$TEMP_DIR" "/var/log/archives"

echo "================================================" >> "$LOG_FILE"
echo "$(date): СТАРТ архивации заказов" >> "$LOG_FILE"
echo "Процесс $$ запущен с приоритетом: $(ps -o ni= -p $$)" >> "$LOG_FILE"

# Функция для создания тестовых данных заказов
generate_test_orders() {
    echo "$(date): Генерация тестовых данных заказов..." >> "$LOG_FILE"
    
    for i in {1..500}; do
        ORDER_FILE="/tmp/order_${i}.json"
        cat > "$ORDER_FILE" << EOF
{
    "order_id": $i,
    "customer_id": $((RANDOM % 1000 + 1)),
    "total_amount": $((RANDOM % 1000 + 10)),
    "items": [
        $(for j in {1..5}; do
            echo "        {\"product_id\": $((RANDOM % 100 + 1)), \"quantity\": $((RANDOM % 5 + 1)), \"price\": $((RANDOM % 100 + 1))}"
            if [ $j -lt 5 ]; then echo ","; fi
        done)
    ],
    "timestamp": "$(date -d "-$((i % 365)) days" '+%Y-%m-%d %H:%M:%S')"
}
EOF
    done
    echo "$(date): Сгенерировано 500 тестовых заказов" >> "$LOG_FILE"
}

# Функция интенсивной обработки данных (создает нагрузку на CPU)
process_orders_intensive() {
    local start_time=$(date +%s)
    echo "$(date): Начало интенсивной обработки заказов..." >> "$LOG_FILE"
    
    processed=0
    for order_file in /tmp/order_*.json; do
        if [ -f "$order_file" ]; then
            # Имитация сложных вычислений - создает нагрузку на CPU
            echo "$(date): Обработка $order_file..." >> "$LOG_FILE"
            
            # Вычисления для создания нагрузки
            for calc in {1..1000}; do
                result=$(echo "scale=1000; 4*a(1)*$calc" | bc -l 2>/dev/null)
            done
            
            # Сжатие данных с максимальным уровнем
            gzip -9 -c "$order_file" > "${order_file}.gz"
            
            # Дополнительные вычисления
            hash=$(md5sum "$order_file" | cut -d' ' -f1)
            size=$(stat -c%s "$order_file")
            compressed_size=$(stat -c%s "${order_file}.gz")
            ratio=$(echo "scale=2; ($size - $compressed_size) * 100 / $size" | bc)
            
            echo "$(date): Файл: $(basename $order_file) | Размер: ${size}B -> ${compressed_size}B (сжатие: ${ratio}%) | Хеш: $hash" >> "$LOG_FILE"
            
            processed=$((processed + 1))
            
            # Обновление прогресса каждые 50 файлов
            if [ $((processed % 50)) -eq 0 ]; then
                current_time=$(date +%s)
                elapsed=$((current_time - start_time))
                echo "$(date): Обработано $processed/500 заказов ($((processed * 100 / 500))%) | Время: ${elapsed}с" >> "$LOG_FILE"
            fi
        fi
    done
    
    local end_time=$(date +%s)
    local total_time=$((end_time - start_time))
    echo "$(date): Интенсивная обработка завершена: $processed заказов за ${total_time} секунд" >> "$LOG_FILE"
}

# Функция создания архива
create_archive() {
    echo "$(date): Создание финального архива..." >> "$LOG_FILE"
    
    local archive_name="orders_archive_$(date +%Y%m%d_%H%M%S).tar.gz"
    local archive_path="$ARCHIVE_DIR/$archive_name"
    
    # Сбор всех сжатых файлов в один архив
    tar -czf "$archive_path" /tmp/order_*.json.gz 2>/dev/null
    
    local archive_size=$(stat -c%s "$archive_path" 2>/dev/null || echo 0)
    local file_count=$(ls /tmp/order_*.json.gz 2>/dev/null | wc -l)
    
    echo "$(date): Архив создан: $archive_path" >> "$LOG_FILE"
    echo "$(date): Размер архива: $archive_size байт" >> "$LOG_FILE"
    echo "$(date): Файлов в архиве: $file_count" >> "$LOG_FILE"
    
    # Проверка целостности архива
    if tar -tzf "$archive_path" >/dev/null 2>&1; then
        echo "$(date): ✓ Целостность архива проверена" >> "$LOG_FILE"
    else
        echo "$(date): ✗ Ошибка целостности архива!" >> "$LOG_FILE"
    fi
}

# Функция очистки временных файлов
cleanup_temp_files() {
    echo "$(date): Очистка временных файлов..." >> "$LOG_FILE"
    
    local temp_files_count=0
    for temp_file in /tmp/order_*.json /tmp/order_*.json.gz; do
        if [ -f "$temp_file" ]; then
            rm -f "$temp_file"
            temp_files_count=$((temp_files_count + 1))
        fi
    done
    
    echo "$(date): Удалено временных файлов: $temp_files_count" >> "$LOG_FILE"
}

# Функция системного мониторинга во время выполнения
system_monitoring() {
    local pid=$$
    (while sleep 10; do
        if ps -p $pid > /dev/null; then
            cpu_usage=$(ps -o %cpu= -p $pid)
            memory_usage=$(ps -o rss= -p $pid)
            nice_value=$(ps -o ni= -p $pid)
            echo "$(date): МОНИТОРИНГ - PID: $$ | CPU: ${cpu_usage}% | MEM: ${memory_usage}KB | NICE: ${nice_value}" >> "$LOG_FILE"
        else
            break
        fi
    done) &
    monitoring_pid=$!
}

# Основная программа
main() {
    echo "$(date): 🚀 ЗАПУСК СКРИПТА АРХИВАЦИИ" >> "$LOG_FILE"
    
    # Запуск фонового мониторинга
    system_monitoring
    
    # Выполнение этапов архивации
    generate_test_orders
    process_orders_intensive
    create_archive
    cleanup_temp_files
    
    # Остановка мониторинга
    kill $monitoring_pid 2>/dev/null
    
    local end_time=$(date +%s)
    local total_script_time=$((end_time - ${start_script_time}))
    
    echo "$(date): ✅ АРХИВАЦИЯ УСПЕШНО ЗАВЕРШЕНА" >> "$LOG_FILE"
    echo "$(date): Общее время выполнения: ${total_script_time} секунд" >> "$LOG_FILE"
    echo "$(date): Логи сохранены в: $LOG_FILE" >> "$LOG_FILE"
    echo "================================================" >> "$LOG_FILE"
    echo "" >> "$LOG_FILE"
}

# Перехват сигналов для корректного завершения
trap 'echo "$(date): ⚠️  СКРИПТ ПРЕРВАН ПОЛЬЗОВАТЕЛЕМ" >> "$LOG_FILE"; exit 1' INT TERM

# Начало выполнения
start_script_time=$(date +%s)
main

exit 0

#!/bin/bash
# Критически важный скрипт мониторинга
# Должен работать с высоким приоритетом

PID_FILE="/var/run/monitor.pid"
echo $$ > $PID_FILE

echo "$(date): Запуск системы мониторинга..."

while true; do
    # Проверка нагрузки системы
    load=$(uptime | awk '{print $10}' | tr -d ',')
    memory_free=$(free -m | awk 'NR==2{print $4}')
    
    # Логирование состояния системы
    echo "$(date) - Load: $load, Free memory: ${memory_free}MB" >> /var/log/monitor.log
    
    # Критическая проверка - имитация важной работы
    if (( $(echo "$load > 5.0" | bc -l) )); then
        echo "ВНИМАНИЕ: Высокая нагрузка на систему!" >> /var/log/monitor_alert.log
    fi
    
    sleep 30
done

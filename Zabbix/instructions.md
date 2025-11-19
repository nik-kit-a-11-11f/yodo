# 1. Установка зависимостей
# Убедитесь, что Python 3 установлен
python3 --version

# Установите необходимые пакеты (если нужны)
# В данном скрипте используются только стандартные библиотеки


# 2. Настройка системы
# Создадим необходимые директории
sudo mkdir -p /var/photostock/queue
sudo mkdir -p /var/photostock/processed
sudo mkdir -p /var/log

# Установим правильные права
sudo chown -R $USER:$USER /var/photostock
sudo chown -R $USER:$USER /var/log/photostock_errors.log

# Или если запускается от другого пользователя:
# sudo chown -R zabbix:zabbix /var/photostock


# 3. Установка скрипта
# Скопируйте скрипт в системную директорию
sudo cp image_processor.py /usr/local/bin/
sudo chmod +x /usr/local/bin/image_processor.py

# Создаем systemd service для управления процессом
sudo nano /etc/systemd/system/photostock.service


# 4. Systemd service файл
# 4.1. Создаем файл сервиса
sudo nano /etc/systemd/system/photostostock.service

# 4.2. Вставляем содержимое (формат INI):

[Unit]
Description=PhotoStock Image Processor
After=network.target

[Service]
Type=simple
User=zabbix
ExecStart=/usr/bin/python3 /usr/local/bin/image_processor.py
WorkingDirectory=/var/photostock
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target

# 4.3. Сохраняем: Ctrl+X → Y → Enter

# 4.4. Активируем
sudo systemctl daemon-reload
sudo systemctl enable photostock.service
sudo systemctl start photostock.service


# 5. Проверяем статус
sudo systemctl status photostock.service

# Смотрим логи
sudo journalctl -u photostock.service -f

# Почему именно /etc/systemd/system/?
# /etc/systemd/system/ - для кастомных сервисов 
#/usr/lib/systemd/system/ - для сервисов из установленных пакетов
# Система сначала проверяет /etc/, потом /usr/lib/, поэтому наши настройки имеют приоритет

# что такое Systemd service файл?
# Systemd service файл — это конфигурационный файл, который описывает как systemd (менеджер системных служб в Linux) должен управлять вашим приложением/сервисом.

# Это текстовый файл с расширением .service, который говорит системе:
# Как запускать ваш сервис
# От какого пользователя запускать
# Что делать при ошибках
# Как автоматически перезапускать
# Зависимости от других сервисов

# Расположение файла
# Системные сервисы (рекомендуется):
# /etc/systemd/system/photostock.service
# Пользовательские сервисы (только для текущего пользователя):
# ~/.config/systemd/user/photostock.service
# Системные пакеты (для установленных пакетов):
# /usr/lib/systemd/system/photostock.service


# 6. Тестирование работы
bash
# Создадим тестовые файлы в очереди
for i in {1..15}; do
    touch "/var/photostock/queue/image_$i.jpg"
done

# Проверим логи на наличие активности
tail -f /var/log/photostock_errors.log

# Проверим обработку файлов
ls -la /var/photostock/processed/


# 7. Ручное управление процессом
bash
# Запуск вручную (для тестирования)
python3 /usr/local/bin/image_processor.py

# Остановка сервиса
sudo systemctl stop photostock.service

# Перезапуск сервиса
sudo systemctl restart photostock.service


# Особенности скрипта для мониторинга Zabbix:
# Процесс - работает как демон, отслеживается по имени image_processor.py
# Очередь - файлы накапливаются в /var/photostock/queue
# Логи ошибок - критические ошибки пишутся в /var/log/photostock_errors.log с пометкой CRITICAL
# Имитация реальной работы - случайные ошибки и переменное время обработки.



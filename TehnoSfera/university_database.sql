-- Учебная база данных "Университет"
-- Удаляем базу если существует и создаем заново
DROP DATABASE IF EXISTS technosfera_db;
CREATE DATABASE technosfera_db;
USE technosfera_db;

-- Таблица факультетов
CREATE TABLE faculties (
    faculty_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    dean_name VARCHAR(100),
    building VARCHAR(50),
    budget DECIMAL(12,2)
);

-- Таблица кафедр
CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT,
    name VARCHAR(100) NOT NULL,
    head_name VARCHAR(100),
    email VARCHAR(100),
    FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id) ON DELETE CASCADE
);

-- Таблица преподавателей
CREATE TABLE professors (
    professor_id INT PRIMARY KEY AUTO_INCREMENT,
    department_id INT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    degree VARCHAR(50),
    salary DECIMAL(10,2),
    hire_date DATE,
    email VARCHAR(100),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE SET NULL
);

-- Таблица студентов
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE,
    email VARCHAR(100),
    phone VARCHAR(20),
    enrollment_year INT,
    scholarship DECIMAL(8,2),
    average_grade DECIMAL(3,2),
    faculty_id INT,
    FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id) ON DELETE SET NULL
);

-- Таблица курсов
CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    credits INT,
    hours INT,
    difficulty ENUM('beginner', 'intermediate', 'advanced'),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE CASCADE
);

-- Таблица расписания занятий
CREATE TABLE schedule (
    schedule_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT,
    professor_id INT,
    room VARCHAR(20),
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    start_time TIME,
    end_time TIME,
    semester ENUM('Fall', 'Spring', 'Summer'),
    academic_year YEAR,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    FOREIGN KEY (professor_id) REFERENCES professors(professor_id) ON DELETE CASCADE
);

-- Таблица оценок студентов
CREATE TABLE grades (
    grade_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    course_id INT,
    professor_id INT,
    grade DECIMAL(3,1),
    exam_date DATE,
    attempt INT DEFAULT 1,
    notes TEXT,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    FOREIGN KEY (professor_id) REFERENCES professors(professor_id) ON DELETE SET NULL
);

-- Таблица научных публикаций
CREATE TABLE publications (
    publication_id INT PRIMARY KEY AUTO_INCREMENT,
    professor_id INT,
    title VARCHAR(200) NOT NULL,
    journal VARCHAR(150),
    publish_date DATE,
    citation_count INT DEFAULT 0,
    isbn VARCHAR(20),
    category ENUM('Article', 'Conference', 'Book', 'Thesis'),
    FOREIGN KEY (professor_id) REFERENCES professors(professor_id) ON DELETE CASCADE
);

-- Таблица студенческих групп
CREATE TABLE student_groups (
    group_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    faculty_id INT,
    curator_id INT,
    created_year YEAR,
    FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id) ON DELETE CASCADE,
    FOREIGN KEY (curator_id) REFERENCES professors(professor_id) ON DELETE SET NULL
);

-- Связующая таблица студентов и групп (многие ко многим)
CREATE TABLE student_group_membership (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    group_id INT,
    join_date DATE,
    role ENUM('member', 'leader', 'deputy'),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES student_groups(group_id) ON DELETE CASCADE
);

-- Заполняем факультеты
INSERT INTO faculties (name, dean_name, building, budget) VALUES
('Факультет Компьютерных Наук', 'Иван Петров', 'Корпус A', 5000000.00),
('Факультет Экономики', 'Мария Сидорова', 'Корпус B', 3500000.00),
('Факультет Иностранных Языков', 'Анна Козлова', 'Корпус C', 2800000.00),
('Факультет Математики', 'Сергей Иванов', 'Корпус D', 3200000.00),
('Факультет Физики', 'Дмитрий Смирнов', 'Корпус E', 4100000.00);

-- Заполняем кафедры
INSERT INTO departments (faculty_id, name, head_name, email) VALUES
(1, 'Кафедра Программирования', 'Алексей Волков', 'prog@technosfera.edu'),
(1, 'Кафедра Искусственного Интеллекта', 'Ольга Новикова', 'ai@technosfera.edu'),
(1, 'Кафедра Кибербезопасности', 'Павел Орлов', 'cyber@technosfera.edu'),
(2, 'Кафедра Финансов', 'Елена Кузнецова', 'finance@technosfera.edu'),
(2, 'Кафедра Менеджмента', 'Артем Лебедев', 'management@technosfera.edu'),
(3, 'Кафедра Английского Языка', 'Татьяна Морозова', 'english@technosfera.edu'),
(3, 'Кафедра Немецкого Языка', 'Виктор Зайцев', 'german@technosfera.edu'),
(4, 'Кафедра Алгебры', 'Надежда Павлова', 'algebra@technosfera.edu'),
(4, 'Кафедра Математического Анализа', 'Григорий Семенов', 'analysis@technosfera.edu'),
(5, 'Кафедра Теоретической Физики', 'Михаил Попов', 'theory@technosfera.edu'),
(5, 'Кафедра Экспериментальной Физики', 'Людмила Васильева', 'experiment@technosfera.edu');

-- Заполняем преподавателей
INSERT INTO professors (department_id, first_name, last_name, degree, salary, hire_date, email, phone) VALUES
(1, 'Андрей', 'Ковалев', 'Доктор наук', 85000.00, '2010-09-01', 'a.kovalev@technosfera.edu', '+7-900-111-2233'),
(1, 'Светлана', 'Михайлова', 'Кандидат наук', 75000.00, '2015-03-15', 's.mikhailova@technosfera.edu', '+7-900-222-3344'),
(2, 'Константин', 'Никитин', 'Доктор наук', 90000.00, '2008-11-20', 'k.nikitin@technosfera.edu', '+7-900-333-4455'),
(2, 'Екатерина', 'Федорова', 'Кандидат наук', 78000.00, '2017-08-10', 'e.fedorova@technosfera.edu', '+7-900-444-5566'),
(3, 'Роман', 'Дмитриев', 'Доктор наук', 82000.00, '2012-05-30', 'r.dmitriev@technosfera.edu', '+7-900-555-6677'),
(4, 'Наталья', 'Алексеева', 'Кандидат наук', 70000.00, '2019-01-12', 'n.alekseeva@technosfera.edu', '+7-900-666-7788'),
(5, 'Игорь', 'Соколов', 'Доктор наук', 88000.00, '2009-07-22', 'i.sokolov@technosfera.edu', '+7-900-777-8899'),
(6, 'Оксана', 'Егорова', 'Кандидат наук', 65000.00, '2016-04-05', 'o.egorova@technosfera.edu', '+7-900-888-9900'),
(7, 'Вадим', 'Тихонов', 'Доктор наук', 72000.00, '2014-10-18', 'v.tikhonov@technosfera.edu', '+7-900-999-0011'),
(8, 'Лариса', 'Романова', 'Кандидат наук', 68000.00, '2018-02-28', 'l.romanova@technosfera.edu', '+7-900-000-1122'),
(9, 'Станислав', 'Воробьев', 'Доктор наук', 87000.00, '2011-12-10', 's.vorobiev@technosfera.edu', '+7-900-112-2334'),
(10, 'Алина', 'Полякова', 'Кандидат наук', 76000.00, '2017-06-14', 'a.polyakova@technosfera.edu', '+7-900-223-3445'),
(11, 'Геннадий', 'Медведев', 'Доктор наук', 91000.00, '2007-03-25', 'g.medvedev@technosfera.edu', '+7-900-334-4556');

-- Заполняем студентов (50 студентов)
INSERT INTO students (first_name, last_name, birth_date, email, phone, enrollment_year, scholarship, average_grade, faculty_id) VALUES
('Александр', 'Иванов', '2000-05-15', 'a.ivanov@student.edu', '+7-901-111-2233', 2020, 2500.00, 4.5, 1),
('Елена', 'Петрова', '2001-03-22', 'e.petrova@student.edu', '+7-901-222-3344', 2020, 2800.00, 4.7, 1),
('Дмитрий', 'Сидоров', '2000-11-08', 'd.sidorov@student.edu', '+7-901-333-4455', 2020, 2200.00, 4.2, 1),
('Ольга', 'Кузнецова', '2001-07-30', 'o.kuznetsova@student.edu', '+7-901-444-5566', 2020, 3000.00, 4.9, 1),
('Максим', 'Попов', '2000-12-14', 'm.popov@student.edu', '+7-901-555-6677', 2020, 2400.00, 4.3, 1),
('Анна', 'Васильева', '2001-02-28', 'a.vasileva@student.edu', '+7-901-666-7788', 2020, 2600.00, 4.6, 1),
('Артем', 'Смирнов', '2000-09-05', 'a.smirnov@student.edu', '+7-901-777-8899', 2020, 2300.00, 4.1, 1),
('Татьяна', 'Новикова', '2001-04-18', 't.novikova@student.edu', '+7-901-888-9900', 2020, 2700.00, 4.4, 1),
('Сергей', 'Морозов', '2000-08-12', 's.morozov@student.edu', '+7-901-999-0011', 2020, 2900.00, 4.8, 1),
('Ирина', 'Волкова', '2001-01-25', 'i.volkova@student.edu', '+7-901-000-1122', 2020, 2100.00, 4.0, 1),
('Виктор', 'Алексеев', '2002-06-10', 'v.alekseev@student.edu', '+7-902-111-2233', 2021, 2500.00, 4.5, 2),
('Мария', 'Лебедева', '2002-03-17', 'm.lebedeva@student.edu', '+7-902-222-3344', 2021, 2800.00, 4.7, 2),
('Павел', 'Семенов', '2002-10-03', 'p.semenov@student.edu', '+7-902-333-4455', 2021, 2200.00, 4.2, 2),
('Юлия', 'Егорова', '2002-07-21', 'y.egorova@student.edu', '+7-902-444-5566', 2021, 3000.00, 4.9, 2),
('Андрей', 'Павлов', '2002-11-29', 'a.pavlov@student.edu', '+7-902-555-6677', 2021, 2400.00, 4.3, 2),
('Екатерина', 'Козлова', '2002-04-14', 'e.kozlova@student.edu', '+7-902-666-7788', 2021, 2600.00, 4.6, 2),
('Никита', 'Степанов', '2002-08-07', 'n.stepanov@student.edu', '+7-902-777-8899', 2021, 2300.00, 4.1, 2),
('Наталья', 'Никитина', '2002-12-19', 'n.nikitina@student.edu', '+7-902-888-9900', 2021, 2700.00, 4.4, 2),
('Иван', 'Захаров', '2002-05-02', 'i.zakharov@student.edu', '+7-902-999-0011', 2021, 2900.00, 4.8, 2),
('Светлана', 'Зайцева', '2002-09-26', 's.zaitseva@student.edu', '+7-902-000-1122', 2021, 2100.00, 4.0, 2),
('Роман', 'Филиппов', '2003-01-15', 'r.filippov@student.edu', '+7-903-111-2233', 2022, 2500.00, 4.5, 3),
('Людмила', 'Маркова', '2003-06-22', 'l.markova@student.edu', '+7-903-222-3344', 2022, 2800.00, 4.7, 3),
('Владимир', 'Белов', '2003-03-08', 'v.belov@student.edu', '+7-903-333-4455', 2022, 2200.00, 4.2, 3),
('Алиса', 'Карасева', '2003-10-30', 'a.karaseva@student.edu', '+7-903-444-5566', 2022, 3000.00, 4.9, 3),
('Георгий', 'Григорьев', '2003-07-14', 'g.grigoriev@student.edu', '+7-903-555-6677', 2022, 2400.00, 4.3, 3),
('Валентина', 'Титова', '2003-11-28', 'v.titova@student.edu', '+7-903-666-7788', 2022, 2600.00, 4.6, 3),
('Станислав', 'Крылов', '2003-04-05', 's.krylov@student.edu', '+7-903-777-8899', 2022, 2300.00, 4.1, 3),
('Галина', 'Тихонова', '2003-08-18', 'g.tikhonova@student.edu', '+7-903-888-9900', 2022, 2700.00, 4.4, 3),
('Федор', 'Савельев', '2003-12-12', 'f.savelyev@student.edu', '+7-903-999-0011', 2022, 2900.00, 4.8, 3),
('Лидия', 'Фролова', '2003-05-25', 'l.frolova@student.edu', '+7-903-000-1122', 2022, 2100.00, 4.0, 3),
('Борис', 'Давыдов', '2000-02-10', 'b.davydov@student.edu', '+7-904-111-2233', 2020, 2500.00, 4.5, 4),
('Зоя', 'Жукова', '2001-09-17', 'z.zhukova@student.edu', '+7-904-222-3344', 2020, 2800.00, 4.7, 4),
('Евгений', 'Родионов', '2000-04-03', 'e.rodionov@student.edu', '+7-904-333-4455', 2020, 2200.00, 4.2, 4),
('Ксения', 'Матвеева', '2001-11-21', 'k.matveeva@student.edu', '+7-904-444-5566', 2020, 3000.00, 4.9, 4),
('Валерий', 'Богданов', '2000-07-29', 'v.bogdanov@student.edu', '+7-904-555-6677', 2020, 2400.00, 4.3, 4),
('Раиса', 'Калинина', '2001-01-14', 'r.kalinina@student.edu', '+7-904-666-7788', 2020, 2600.00, 4.6, 4),
('Глеб', 'Антонов', '2000-10-07', 'g.antonov@student.edu', '+7-904-777-8899', 2020, 2300.00, 4.1, 4),
('Маргарита', 'Ильина', '2001-12-19', 'm.ilina@student.edu', '+7-904-888-9900', 2020, 2700.00, 4.4, 4),
('Ярослав', 'Фомин', '2000-03-02', 'y.fomin@student.edu', '+7-904-999-0011', 2020, 2900.00, 4.8, 4),
('Вера', 'Маслова', '2001-08-26', 'v.maslova@student.edu', '+7-904-000-1122', 2020, 2100.00, 4.0, 4),
('Даниил', 'Киселев', '2002-05-15', 'd.kiselev@student.edu', '+7-905-111-2233', 2021, 2500.00, 4.5, 5),
('Регина', 'Максимова', '2002-02-22', 'r.maximova@student.edu', '+7-905-222-3344', 2021, 2800.00, 4.7, 5),
('Семен', 'Орлов', '2002-09-08', 's.orlov@student.edu', '+7-905-333-4455', 2021, 2200.00, 4.2, 5),
('Ульяна', 'Сергеева', '2002-06-30', 'u.sergeeva@student.edu', '+7-905-444-5566', 2021, 3000.00, 4.9, 5),
('Мирон', 'Пахомов', '2002-12-14', 'm.pakhomov@student.edu', '+7-905-555-6677', 2021, 2400.00, 4.3, 5),
('Эльвира', 'Виноградова', '2002-03-28', 'e.vinogradova@student.edu', '+7-905-666-7788', 2021, 2600.00, 4.6, 5),
('Аркадий', 'Шестаков', '2002-08-05', 'a.shestakov@student.edu', '+7-905-777-8899', 2021, 2300.00, 4.1, 5),
('Агата', 'Блинова', '2002-11-18', 'a.blinova@student.edu', '+7-905-888-9900', 2021, 2700.00, 4.4, 5),
('Прохор', 'Коновалов', '2002-04-12', 'p.konovalov@student.edu', '+7-905-999-0011', 2021, 2900.00, 4.8, 5),
('Инна', 'Ефимова', '2002-07-25', 'i.efimova@student.edu', '+7-905-000-1122', 2021, 2100.00, 4.0, 5);

-- Заполняем курсы
INSERT INTO courses (name, description, credits, hours, difficulty, department_id) VALUES
('Введение в программирование', 'Основы алгоритмизации и программирования на Python', 4, 120, 'beginner', 1),
('Базы данных', 'Проектирование и работа с реляционными базами данных', 5, 150, 'intermediate', 1),
('Машинное обучение', 'Алгоритмы и методы машинного обучения', 6, 180, 'advanced', 2),
('Веб-разработка', 'Создание веб-приложений с использованием современных технологий', 5, 150, 'intermediate', 1),
('Кибербезопасность', 'Основы защиты информации и сетевой безопасности', 4, 120, 'advanced', 3),
('Финансовый менеджмент', 'Управление финансами предприятия', 5, 150, 'intermediate', 4),
('Маркетинг', 'Основы маркетинговых исследований и стратегий', 4, 120, 'beginner', 5),
('Английский для IT', 'Профессиональный английский для IT-специалистов', 3, 90, 'beginner', 6),
('Деловой немецкий', 'Немецкий язык для бизнес-коммуникации', 3, 90, 'intermediate', 7),
('Линейная алгебра', 'Матрицы, векторы и системы линейных уравнений', 5, 150, 'intermediate', 8),
('Математический анализ', 'Дифференциальное и интегральное исчисление', 6, 180, 'advanced', 9),
('Квантовая механика', 'Основы квантовой теории и ее приложения', 6, 180, 'advanced', 10),
('Экспериментальная физика', 'Практические работы и эксперименты в физике', 4, 120, 'intermediate', 11);

-- Заполняем расписание
INSERT INTO schedule (course_id, professor_id, room, day_of_week, start_time, end_time, semester, academic_year) VALUES
(1, 1, 'A-101', 'Monday', '09:00:00', '10:30:00', 'Fall', 2023),
(1, 1, 'A-101', 'Wednesday', '09:00:00', '10:30:00', 'Fall', 2023),
(2, 2, 'A-205', 'Tuesday', '11:00:00', '12:30:00', 'Fall', 2023),
(2, 2, 'A-205', 'Thursday', '11:00:00', '12:30:00', 'Fall', 2023),
(3, 3, 'B-102', 'Monday', '14:00:00', '15:30:00', 'Fall', 2023),
(3, 3, 'B-102', 'Wednesday', '14:00:00', '15:30:00', 'Fall', 2023),
(4, 1, 'A-301', 'Friday', '10:00:00', '11:30:00', 'Fall', 2023),
(5, 5, 'C-201', 'Tuesday', '16:00:00', '17:30:00', 'Fall', 2023),
(6, 6, 'B-305', 'Monday', '09:00:00', '10:30:00', 'Fall', 2023),
(7, 7, 'B-310', 'Wednesday', '11:00:00', '12:30:00', 'Fall', 2023);

-- Заполняем оценки (генерируем случайные оценки для студентов)
INSERT INTO grades (student_id, course_id, professor_id, grade, exam_date, attempt) VALUES
(1, 1, 1, 4.5, '2023-12-20', 1),
(1, 2, 2, 5.0, '2023-12-22', 1),
(2, 1, 1, 4.8, '2023-12-20', 1),
(2, 3, 3, 4.2, '2023-12-25', 1),
(3, 1, 1, 3.9, '2023-12-20', 1),
(3, 4, 1, 4.1, '2023-12-28', 1),
(4, 2, 2, 4.9, '2023-12-22', 1),
(4, 5, 5, 5.0, '2023-12-26', 1),
(5, 1, 1, 4.3, '2023-12-20', 1),
(5, 6, 6, 4.7, '2023-12-23', 1);

-- Заполняем научные публикации
INSERT INTO publications (professor_id, title, journal, publish_date, citation_count, isbn, category) VALUES
(1, 'Современные подходы в обучении программированию', 'Информатика и образование', '2022-03-15', 12, '978-5-123-45678-9', 'Article'),
(3, 'Нейросетевые алгоритмы для анализа больших данных', 'Искусственный интеллект', '2021-11-20', 25, '978-5-234-56789-0', 'Conference'),
(5, 'Методы защиты от кибератак в корпоративных сетях', 'Безопасность информации', '2023-01-10', 8, '978-5-345-67890-1', 'Article'),
(8, 'Инновационные методики преподавания английского языка', 'Иностранные языки в школе', '2022-09-05', 15, '978-5-456-78901-2', 'Book'),
(11, 'Новые направления в математическом анализе', 'Математические заметки', '2020-12-15', 32, '978-5-567-89012-3', 'Article');

-- Заполняем студенческие группы
INSERT INTO student_groups (name, faculty_id, curator_id, created_year) VALUES
('ИТ-20-1', 1, 1, 2020),
('ИТ-20-2', 1, 2, 2020),
('ЭК-21-1', 2, 6, 2021),
('ЭК-21-2', 2, 7, 2021),
('ЛГ-22-1', 3, 8, 2022),
('МТ-20-1', 4, 10, 2020),
('ФЗ-21-1', 5, 12, 2021);

-- Заполняем членство в группах
INSERT INTO student_group_membership (student_id, group_id, join_date, role) VALUES
(1, 1, '2020-09-01', 'leader'),
(2, 1, '2020-09-01', 'member'),
(3, 1, '2020-09-01', 'member'),
(4, 2, '2020-09-01', 'leader'),
(5, 2, '2020-09-01', 'member'),
(11, 3, '2021-09-01', 'leader'),
(12, 3, '2021-09-01', 'member'),
(21, 5, '2022-09-01', 'leader'),
(31, 6, '2020-09-01', 'leader'),
(41, 7, '2021-09-01', 'leader');

-- Создаем представления для удобства
CREATE VIEW student_info AS
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS full_name,
    s.enrollment_year,
    f.name AS faculty_name,
    sg.name AS group_name,
    s.average_grade
FROM students s
LEFT JOIN faculties f ON s.faculty_id = f.faculty_id
LEFT JOIN student_group_membership sgm ON s.student_id = sgm.student_id
LEFT JOIN student_groups sg ON sgm.group_id = sg.group_id;

CREATE VIEW professor_courses AS
SELECT 
    p.professor_id,
    CONCAT(p.first_name, ' ', p.last_name) AS professor_name,
    d.name AS department_name,
    f.name AS faculty_name,
    c.name AS course_name
FROM professors p
JOIN departments d ON p.department_id = d.department_id
JOIN faculties f ON d.faculty_id = f.faculty_id
JOIN courses c ON c.department_id = d.department_id;

-- Создаем индекс для улучшения производительности
CREATE INDEX idx_student_name ON students(first_name, last_name);
CREATE INDEX idx_grade_student_course ON grades(student_id, course_id);
CREATE INDEX idx_schedule_course_professor ON schedule(course_id, professor_id);

-- Выводим сообщение о успешном создании
SELECT 'Учебная база данных "Университет" успешно создана!' AS message;
SELECT 
    (SELECT COUNT(*) FROM faculties) AS faculties_count,
    (SELECT COUNT(*) FROM departments) AS departments_count,
    (SELECT COUNT(*) FROM professors) AS professors_count,
    (SELECT COUNT(*) FROM students) AS students_count,
    (SELECT COUNT(*) FROM courses) AS courses_count;



const { exec, spawn } = require("child_process");
const fs = require('fs');

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}

//storeData(ipMap, '/Users/lexxmg/Desktop/ip.json');

const loadData = (path) => {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch (err) {
    console.error(err)
    return false
  }
}

const ipMap = JSON.parse( loadData('/Users/lexxmg/Desktop/ip.json') );

//console.log(ipMap);

/*
const ip = [
  {ip: '185.35.160.65', sw: '', name: 'GATEWAY', description: 'не доступен', stat: false,},
  {ip: '185.35.160.66', sw: '', name: 'ТЕЛЕКОМПРОЕКТ (Server Mac)', description: 'не доступен', stat: false,},
  {ip: '185.35.160.67', sw: '', name: 'тест (MyPBX   SIP)', description: 'не доступен', stat: false,},
  {ip: '185.35.160.68', sw: '', name: 'debian', description: 'не доступен', stat: false,},
  {ip: '185.35.160.69', sw: '', name: 'raspberry тест', description: 'не доступен', stat: false,},
  {ip: '185.35.160.70', sw: '', name: 'Столовая', description: 'не доступен', stat: false,},
  {ip: '185.35.160.71', sw: '', name: 'ТЕЛЕКОМПРОЕКТ', description: 'не доступен', stat: false,},
  {ip: '185.35.160.72', sw: '', name: 'ТексЭлектро', description: 'не доступен', stat: false,},
  {ip: '185.35.160.73', sw: '', name: 'Интегрика инженеринг', description: 'не доступен', stat: false,},
  {ip: '185.35.160.74', sw: '', name: 'ИП Боев', description: 'не доступен', stat: false,},
  {ip: '185.35.160.75', sw: '', name: 'ООО "Витако"', description: 'не доступен', stat: false,},
  {ip: '185.35.160.76', sw: '', name: 'МОК', description: 'не доступен', stat: false,},
  {ip: '185.35.160.77', sw: '', name: 'ООО "Монза"', description: 'не доступен', stat: false,},
  {ip: '185.35.160.78', sw: '', name: 'ООО «Стальпроектсервис" (роутер)', description: 'не доступен', stat: false,},
  {ip: '185.35.160.79', sw: '', name: 'НП  Объединение проектных строительных организаций «ЭнергоТеплоМеталлургПроект»', description: 'не доступен', stat: false,},
  {ip: '185.35.160.80', sw: '', name: 'Альфа Продукт', description: 'не доступен', stat: false,},
  {ip: '185.35.160.81', sw: '1', name: 'ООО «АНТ Технолоджис»', description: 'не доступен', stat: false,},
  {ip: '185.35.160.82', sw: '1', name: 'аргус мастер', description: 'не доступен', stat: false,},
  {ip: '185.35.160.83', sw: '', name: 'центр строй', description: 'не доступен', stat: false,},
  {ip: '185.35.160.84', sw: '', name: 'ЗАО "Степ Ап"', description: 'не доступен', stat: false,},
  {ip: '185.35.160.85', sw: '', name: 'ООО "Паритет"', description: 'не доступен', stat: false,},
  {ip: '185.35.160.86', sw: '', name: 'ООО «ОРЕОЛ" (роутер)', description: 'не доступен', stat: false,},
  {ip: '185.35.160.87', sw: '', name: 'ЙОГА', description: 'не доступен', stat: false,},
  {ip: '185.35.160.88', sw: '', name: 'ИП Монтов', description: 'не доступен', stat: false,},
  {ip: '185.35.160.89', sw: '', name: 'new ride', description: 'не доступен', stat: false,},
  {ip: '185.35.160.90', sw: '', name: 'ООО "Сервейн"', description: 'не доступен', stat: false,},
  {ip: '185.35.160.91', sw: '', name: 'Санте', description: 'не доступен', stat: false,},
  {ip: '185.35.160.92', sw: '', name: 'КР Метрология', description: 'не доступен', stat: false,},
  {ip: '185.35.160.93', sw: '', name: 'Здрав эксперт', description: 'не доступен', stat: false,},
  {ip: '185.35.160.94', sw: '', name: 'Сервис-решения', description: 'не доступен', stat: false,},
  {ip: '185.35.160.95', sw: '', name: 'ЗАО "Степ Ап"', description: 'не доступен', stat: false,},
  {ip: '185.35.160.96', sw: '', name: 'Бюлер АГ', description: 'не доступен', stat: false,},
  {ip: '185.35.160.97', sw: '', name: 'Бюлер АГ', description: 'не доступен', stat: false,},
  {ip: '185.35.160.98', sw: '', name: 'ЗАО «МЕДИЭЙС»', description: 'не доступен', stat: false,},
  {ip: '185.35.160.99', sw: '', name: 'РМК', description: 'не доступен', stat: false,},
  {ip: '185.35.160.100', sw: '', name: 'РМК', description: 'не доступен', stat: false,},
  {ip: '185.35.160.101', sw: '', name: 'Гамма-Сталь-Центр', description: 'не доступен', stat: false,},
  {ip: '185.35.160.102', sw: '', name: 'Гамма-Сталь-Центр', description: 'не доступен', stat: false,},
  {ip: '185.35.160.103', sw: '', name: 'Биолатик', description: 'не доступен', stat: false,},
  {ip: '185.35.160.104', sw: '', name: 'ЗАО «МЕДИЭЙС»', description: 'не доступен', stat: false,},
  {ip: '185.35.160.105', sw: '', name: 'Переговорная (стальпроект 2316)', description: 'не доступен', stat: false,},
  {ip: '185.35.160.106', sw: '', name: 'dell r-520  свободный', description: 'не доступен', stat: false,},
  {ip: '185.35.160.107', sw: '', name: 'Юра', description: 'не доступен', stat: false,},
  {ip: '185.35.160.108', sw: '', name: 'Строймаркет', description: 'не доступен', stat: false,},
  {ip: '185.35.160.109', sw: '', name: 'ЗАО «МЕДИЭЙС»', description: 'не доступен', stat: false,},
  {ip: '185.35.160.110', sw: '', name: 'mining', description: 'не доступен', stat: false,},
  {ip: '185.35.160.111', sw: '', name: 'Инновационный Технологии', description: 'не доступен', stat: false,},
  {ip: '185.35.160.112', sw: '', name: 'ООО "МЕДАКАДЕМИЯ"', description: 'не доступен', stat: false,},
  {ip: '185.35.160.113', sw: '', name: 'МОК', description: 'не доступен', stat: false,},
  {ip: '185.35.160.114', sw: '', name: 'Келлер Восток', description: 'не доступен', stat: false,},
  {ip: '185.35.160.115', sw: '', name: 'Инклюзив терейдинг', description: 'не доступен', stat: false,},
  {ip: '185.35.160.116', sw: '', name: 'ЗАО "Степ Ап"', description: 'не доступен', stat: false,},
  {ip: '185.35.160.117', sw: '', name: 'Павел Тесленко', description: 'не доступен', stat: false,},
  {ip: '185.35.160.118', sw: '', name: 'Глебов Борис', description: 'не доступен', stat: false,},
  {ip: '185.35.160.119', sw: '', name: 'МОК', description: 'не доступен', stat: false,},
  {ip: '185.35.160.120', sw: '', name: 'PMK MyPBX ( фаервол)', description: 'не доступен', stat: false,},
  {ip: '185.35.160.121', sw: '', name: 'Asterisk (нету)', description: 'не доступен', stat: false,},
  {ip: '185.35.160.122', sw: '', name: 'NAS', description: 'не доступен', stat: false,},
  {ip: '185.35.160.123', sw: '', name: 'SW 1 серверная', description: 'не доступен', stat: false,},
  {ip: '185.35.160.124', sw: '', name: 'SW 2 2 корпус 3 эт.', description: 'не доступен', stat: false,},
  {ip: '185.35.160.125', sw: '', name: 'SW 3/4/1   3 корпус 4 эт.', description: 'не доступен', stat: false,},
  {ip: '185.35.160.126', sw: '', name: 'SW 4 ?', description: 'не доступен', stat: false,},
  {ip: '185.35.161.65', sw: '', name: 'GATEWAY', description: 'не доступен', stat: false,},
  {ip: '185.35.161.66', sw: '', name: 'Боулинг Гейм', description: 'не доступен', stat: false,},
  {ip: '185.35.161.67', sw: '', name: 'НоваяКорпарация', description: 'не доступен', stat: false,},
  {ip: '185.35.161.68', sw: '', name: 'Фарм-Поставка', description: 'не доступен', stat: false,},
  {ip: '185.35.161.69', sw: '', name: 'СВОБОДНАЯ ДОРОГА', description: 'не доступен', stat: false,},
  {ip: '185.35.161.70', sw: '', name: 'Сатис софт', description: 'не доступен', stat: false,},
  {ip: '185.35.161.71', sw: '', name: 'Кафе', description: 'не доступен', stat: false,},
  {ip: '185.35.161.72', sw: '', name: 'Витако', description: 'не доступен', stat: false,},
  {ip: '185.35.161.73', sw: '', name: 'ГлоблЛаб', description: 'не доступен', stat: false,},
  {ip: '185.35.161.74', sw: '1', name: 'ЛСМ Восток', description: 'не доступен', stat: false,},
  {ip: '185.35.161.75', sw: '', name: 'Оснастик', description: 'не доступен', stat: false,},
  {ip: '185.35.161.76', sw: '', name: 'спектрум', description: 'не доступен', stat: false,},
  {ip: '185.35.161.77', sw: '', name: 'КРД', description: 'не доступен', stat: false,},
  {ip: '185.35.161.78', sw: '', name: 'КРД', description: 'не доступен', stat: false,},
  {ip: '185.35.161.79', sw: '', name: 'КРД', description: 'не доступен', stat: false,},
  {ip: '185.35.161.80', sw: '', name: 'ДЕМЧОГ ЭКСПЕНШН', description: 'не доступен', stat: false,},
  {ip: '185.35.161.81', sw: '', name: 'Аэропроф', description: 'не доступен', stat: false,},
  {ip: '185.35.161.82', sw: '', name: 'Аэропроф', description: 'не доступен', stat: false,},
  {ip: '185.35.161.83', sw: '', name: 'Текранч', description: 'не доступен', stat: false,},
  {ip: '185.35.161.84', sw: '', name: 'Алгоритм', description: 'не доступен', stat: false,},
  {ip: '185.35.161.85', sw: '', name: 'Зевс', description: 'не доступен', stat: false,},
  {ip: '185.35.161.86', sw: '', name: 'Феникс-групп', description: 'не доступен', stat: false,},
  {ip: '185.35.161.87', sw: '', name: 'СФ-КОМПЛЕКТ', description: 'не доступен', stat: false,},
  {ip: '185.35.161.88', sw: '', name: 'Бизнес Альянс', description: 'не доступен', stat: false,},
  {ip: '185.35.161.89', sw: '', name: 'Оснастик', description: 'не доступен', stat: false,},
  {ip: '185.35.161.90', sw: '', name: 'Дилайт софт', description: 'не доступен', stat: false,},
  {ip: '185.35.161.91', sw: '', name: 'Оснастик', description: 'не доступен', stat: false,},
  {ip: '185.35.161.92', sw: '', name: 'АВ Клуб', description: 'не доступен', stat: false,},
  {ip: '185.35.161.93', sw: '1', name: 'МРП техноаргус', description: 'не доступен', stat: false,},
  {ip: '185.35.161.94', sw: '1', name: 'Оснастик', description: 'не доступен', stat: false,},
  {ip: '185.35.161.95', sw: '1', name: 'Подарочные решения', description: 'не доступен', stat: false,},
  {ip: '185.35.161.96', sw: '', name: 'НДМ ТРЕЙД', description: 'не доступен', stat: false,},
  {ip: '185.35.161.97', sw: '', name: 'НДМ ТРЕЙД', description: 'не доступен', stat: false,},
  {ip: '185.35.161.98', sw: '', name: 'КРД (поликор)', description: 'не доступен', stat: false,},
  {ip: '185.35.161.99', sw: '', name: 'ИП Егорова', description: 'не доступен', stat: false,},
  {ip: '185.35.161.100', sw: '', name: 'ИП Егорова', description: 'не доступен', stat: false,},
  {ip: '185.35.161.101', sw: '', name: 'ИП Егорова', description: 'не доступен', stat: false,},
  {ip: '185.35.161.102', sw: '', name: 'ИП Егорова', description: 'не доступен', stat: false,},
  {ip: '185.35.161.103', sw: '', name: 'ИП Егорова', description: 'не доступен', stat: false,},
  {ip: '185.35.161.104', sw: '', name: '-', description: 'не доступен', stat: false,},
  {ip: '185.35.161.105', sw: '', name: '-', description: 'не доступен', stat: false,},
  {ip: '185.35.161.106', sw: '', name: 'ГлоблЛаб', description: 'не доступен', stat: false,},
  {ip: '185.35.161.107', sw: '', name: 'ГлоблЛаб', description: 'не доступен', stat: false,},
  {ip: '185.35.161.108', sw: '', name: 'ГлоблЛаб', description: 'не доступен', stat: false,},
  {ip: '185.35.161.109', sw: '', name: 'Гарант бизнеса', description: 'не доступен', stat: false,},
  {ip: '185.35.161.110', sw: '', name: 'ИП Гнедков', description: 'не доступен', stat: false,},
  {ip: '185.35.161.111', sw: '', name: 'ИнтехСЦ', description: 'не доступен', stat: false,},
  {ip: '185.35.161.112', sw: '', name: 'Млстрой', description: 'не доступен', stat: false,},
  {ip: '185.35.161.113', sw: '', name: 'телемед-сервис', description: 'не доступен', stat: false,},
  {ip: '185.35.161.114', sw: '', name: 'ИП Гнедков', description: 'не доступен', stat: false,},
  {ip: '185.35.161.115', sw: '', name: 'Зебра-мед', description: 'не доступен', stat: false,},
  {ip: '185.35.161.116', sw: '', name: 'Юникав', description: 'не доступен', stat: false,},
  {ip: '185.35.161.117', sw: '', name: 'Астрамед', description: 'не доступен', stat: false,},
  {ip: '185.35.161.118', sw: '', name: 'Стройинженеринг', description: 'не доступен', stat: false,},
  {ip: '185.35.161.119', sw: '', name: 'Моспринт', description: 'не доступен', stat: false,},
  {ip: '185.35.161.120', sw: '', name: 'Светалекс-фарм', description: 'не доступен', stat: false,},
  {ip: '185.35.161.121', sw: '', name: 'СанБай', description: 'не доступен', stat: false,},
  {ip: '185.35.161.122', sw: '', name: 'Тк-логистик', description: 'не доступен', stat: false,},
  {ip: '185.35.161.123', sw: '', name: 'Эльд-косметик', description: 'не доступен', stat: false,},
  {ip: '185.35.161.124', sw: '', name: 'ИП Климчуков', description: 'не доступен', stat: false,},
  {ip: '185.35.161.125', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.126', sw: '', name: 'РоссКомНадзрор', description: 'не доступен', stat: false,},
  {ip: '185.35.161.129', sw: '', name: 'GATEWAY', description: 'не доступен', stat: false,},
  {ip: '185.35.161.130', sw: '', name: 'Телекомпроект', description: 'не доступен', stat: false,},
  {ip: '185.35.161.131', sw: '', name: 'Ореол', description: 'не доступен', stat: false,},
  {ip: '185.35.161.132', sw: '', name: 'Паритет', description: 'не доступен', stat: false,},
  {ip: '185.35.161.133', sw: '', name: 'Сервейн', description: 'не доступен', stat: false,},
  {ip: '185.35.161.134', sw: '', name: 'Стальпроект', description: 'не доступен', stat: false,},
  {ip: '185.35.161.135', sw: '', name: 'Стельпроект сервис', description: 'не доступен', stat: false,},
  {ip: '185.35.161.136', sw: '', name: 'Паритет плюс', description: 'не доступен', stat: false,},
  {ip: '185.35.161.137', sw: '', name: 'Институт стальпроект', description: 'не доступен', stat: false,},
  {ip: '185.35.161.138', sw: '', name: 'МедАкадемия', description: 'не доступен', stat: false,},
  {ip: '185.35.161.139', sw: '', name: 'МедАкадемия', description: 'не доступен', stat: false,},
  {ip: '185.35.161.140', sw: '', name: 'МедАкадемия', description: 'не доступен', stat: false,},
  {ip: '185.35.161.141', sw: '', name: 'МедАкадемия', description: 'не доступен', stat: false,},
  {ip: '185.35.161.142', sw: '', name: 'МедАкадемия', description: 'не доступен', stat: false,},
  {ip: '185.35.161.143', sw: '', name: 'Школьная пресса', description: 'не доступен', stat: false,},
  {ip: '185.35.161.144', sw: '', name: 'Школьная пресса', description: 'не доступен', stat: false,},
  {ip: '185.35.161.145', sw: '', name: 'Школьная пресса', description: 'не доступен', stat: false,},
  {ip: '185.35.161.146', sw: '', name: 'Школьная пресса', description: 'не доступен', stat: false,},
  {ip: '185.35.161.147', sw: '', name: 'Школьная пресса', description: 'не доступен', stat: false,},
  {ip: '185.35.161.148', sw: '', name: 'Школьная пресса', description: 'не доступен', stat: false,},
  {ip: '185.35.161.149', sw: '', name: 'трифик брайт (Усачёв А.Д)', description: 'не доступен', stat: false,},
  {ip: '185.35.161.150', sw: '1', name: 'Экопро', description: 'не доступен', stat: false,},
  {ip: '185.35.161.151', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.152', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.153', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.154', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.155', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.156', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.157', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.158', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.159', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.160', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.161', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.162', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.163', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.164', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.165', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.166', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.167', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.168', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.169', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.170', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.171', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.172', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.173', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.174', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.175', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.176', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.177', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.178', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.179', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.180', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.181', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.182', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.183', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.184', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.185', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.186', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.187', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.188', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.189', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.190', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.191', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.192', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.193', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.194', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.195', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.196', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.197', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.198', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.199', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.200', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.201', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.202', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.203', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.204', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.205', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.206', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.207', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.208', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.209', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.210', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.211', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.212', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.213', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.214', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.215', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.216', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.217', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.218', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.219', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.220', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.221', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.222', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.223', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.224', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.225', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.226', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.227', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.228', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.229', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.230', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.231', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.232', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.233', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.234', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.235', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.236', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.237', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.238', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.239', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.240', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.241', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.242', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.243', sw: '', name: '', description: 'не доступен', stat: false,},
  {ip: '185.35.161.244', sw: '', name: 'Телекомпроект Servers', description: 'не доступен', stat: false,},
  {ip: '185.35.161.245', sw: '', name: 'Телекомпроект Servers', description: 'не доступен', stat: false,},
  {ip: '185.35.161.246', sw: '', name: 'Телекомпроект Servers', description: 'не доступен', stat: false,},
  {ip: '185.35.161.247', sw: '', name: 'Телекомпроект Servers', description: 'не доступен', stat: false,},
  {ip: '185.35.161.248', sw: '', name: 'Телекомпроект Servers', description: 'не доступен', stat: false,},
  {ip: '185.35.161.249', sw: '', name: 'Телекомпроект Servers', description: 'не доступен', stat: false,},
  {ip: '185.35.161.250', sw: '', name: 'Телекомпроект Servers', description: 'не доступен', stat: false,},
  {ip: '185.35.161.251', sw: '', name: 'Телекомпроект Servers', description: 'не доступен', stat: false,},
  {ip: '185.35.161.252', sw: '', name: 'Телекомпроект Servers', description: 'не доступен', stat: false,},
  {ip: '185.35.161.253', sw: '', name: 'Телекомпроект Servers', description: 'не доступен', stat: false,},
  {ip: '185.35.161.254', sw: '', name: 'test-log_RaspberryPI', description: 'не доступен', stat: false,}
];

const ipMap = ip.map((item, i) => {
  return {id: i, ...item};
});

*/

const time = Date.now();

// const ping = spawn('ping', ['-c 4', '-i 0.2', '-W 2', ip[4]]);
//
// ping.stdout.on("data", data => {
//     console.log(`stdout: ${data}`);
// });
//
// ping.stderr.on("data", data => {
//     console.log(`stderr: ${data}`);
// });
//
// ping.on('error', (error) => {
//     console.log(`error: ${error.message}`);
// });
//
// ping.on("close", code => {
//     console.log(`child process exited with code ${code}`);
// });

let result = [];

ipMap.forEach((item, i) => {
  exec(`ping -c 4 -i 0.2 -W 4 ${item.ip}`, (error, stdout, stderr) => {
    if (error) {
        //console.log(`error: ${error.message}`);
        //console.log(`${item}-не доступен`);
        result = [...result, {...item}];

        if (result.length === ipMap.length) {
          success();
        }
        return;
    }

    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }

    //console.log(`stdout: ${stdout}`);
    //console.log(`${item}-доступен`);
    result = [...result, {...item, description: 'доступен', stat: true}];

    if (result.length === ipMap.length) {
      success();
    }
  });
});

function success() {
  console.log(result.length);

  result.sort(function(a, b) {
    const sort = 'id';

    if (a[sort] < b[sort]) return -1;
    if (a[sort] > b[sort]) return 1;

    return 0 // Никакой сортировки
  });

  let j = 0;
  result.forEach((item, i) => {
    if (item.stat) {
      j++;
      console.log(item.ip + ' ' + item.name + '-' + item.description + ' ' + j);
    }
  });

  console.log(Date.now() - time);
}

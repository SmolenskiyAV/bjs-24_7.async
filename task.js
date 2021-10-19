class AlarmClock {

    constructor() {
        
        this.alarmCollection = []; // коллекция звонков
        this.timerId = NaN; // свойство для хранения id без начального состояния

    }

    addClock(time, callback, id) {

        if (id === undefined) throw new Error('Невозможно идентифицировать будильник. Параметр id не передан.');
        
        if (this.alarmCollection.find(element => element.id === id)) { // проверка, есть ли в коллекции звонков объект со свойством id равным введённому параметру id, принадлежащему addClock
            console.error('Будильник с таким id уже существует.');
            return;
        }

        return this.alarmCollection.push(
            {id: id, time: time, callback: callback} // добавление в коллецию звонков объекта со свойствами
        )
    }

    removeClock(id) {

        let preLength = this.alarmCollection; // длина массива до удаления

        const indexResult = this.alarmCollection.findIndex((object) => object.id === id); //находим индекс элемента со свойством, равным id
        this.alarmCollection.splice(indexResult, 1); // удаление найденного элемента

        return  (preLength - this.alarmCollection !==0); // если удаление успешно, возвращаем true

    }

    getCurrentFormattedTime() {
        
        let nowDate = new Date(); // получение текущего времени в стандартном формате
        return (nowDate.getHours() + ':' + nowDate.getMinutes()); // вывод строкового значения текущего времени в формате НН:ММ
      
    }

    start() {
        
        function checkClock(time, callback) { //получение звонка функцией в качестве двух параметров
            
            if (time === getCurrentFormattedTime()) callback; //если time совпадает с текущим временем, вызываем callback
        }

            if (this.timerId === NaN) {
                setInterval(this.alarmCollection.forEach(checkClock)) // перебор коллекции звонков и вызов checkClock. 
                this.timerId = setInterval(this.alarmCollection.forEach(checkClock)) // Сохранение результата setInterval в свойство идентифиатора текущего таймера
            }
    }

    stop() {

        if (this.timerId !== NaN) {
            clearInterval(this.timerId); // удаление интервала
            this.timerId = NaN; //удаление значения из идентификатора текущего таймера
        }

    }

    printAlarms() {

        this.alarmCollection.forEach(console.log(this.alarmCollection.id, this.alarmCollection.time)); //вывод информации о каждом звонке 'id' и 'time'

    }

    clearAlarms() {
        this.stop();
        this.alarmCollection.splice(0, end); // очистка коллекции звонков 
    }

}



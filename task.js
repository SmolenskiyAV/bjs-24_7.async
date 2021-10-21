class AlarmClock {

    constructor() {
        
        this.alarmCollection = []; // коллекция звонков
        this.timerId = null; // свойство для хранения id без начального состояния

    }

    addClock(time, callback, id) {

        if (id === undefined) throw new Error('Невозможно идентифицировать будильник. Параметр id не передан.');
        
        if (this.alarmCollection.find(element => element.id === id)) { // проверка, есть ли в коллекции звонков объект со свойством id равным введённому параметру id, принадлежащему addClock
            console.error('Будильник с таким id уже существует.');
            return;
        }

        return this.alarmCollection.push(
            {id, time, callback} // добавление в коллецию звонков объекта со свойствами
        )
    }

    removeClock(id) {

        let preLength = this.alarmCollection.length; // длина массива до удаления

        const indexResult = this.alarmCollection.findIndex((object) => object.id === id); //находим индекс элемента со свойством, равным id
        this.alarmCollection.splice(indexResult, 1); // удаление найденного элемента

        return  (preLength - this.alarmCollection.length !==0); // если удаление успешно, возвращаем true

    }

    getCurrentFormattedTime() {
        
        let nowDate = new Date(); // получение текущего времени в стандартном формате
        return (
            nowDate.toLocaleTimeString("ru-Ru", {// вывод строкового значения текущего времени в формате НН:ММ
                hour: "2-digit",
                minute: "2-digit",
                })
        )
    }

    start() {
        
        function checkClock(time, callback) { //получение звонка функцией в качестве двух параметров
            
            if (time === this.getCurrentFormattedTime()) callback(); //если time совпадает с текущим временем, вызываем callback
        
            if (this.timerId === null) {
                
                this.timerId = setInterval( // Сохранение результата setInterval в свойство идентифиатора текущего таймера
                
                    function (){
                        let checkClocK = checkClock.bind(start); //пытаемся привязать функцию checkClock к контексту метода .start() текущего объекта(принадлежащего классу AlarmClock) 
                        for (const item of this.alarmCollection) {
                        checkClocK(); // вызываем checkClock в контексте текущего объекта
                        }
                    }
                )
            }
         }  
                
    }

    stop() {

        if (this.timerId !== null) {
            clearInterval(this.timerId); // удаление интервала
            this.timerId = null; //удаление значения из идентификатора текущего таймера
        }

    }

    printAlarms() {

        this.alarmCollection.forEach((item, idx) => console.log('Будильник №' + this.alarmCollection[idx].id + ' заведён на' + this.alarmCollection[idx].time)); //вывод информации о каждом звонке

    }

    clearAlarms() {
        this.stop();
        this.alarmCollection.splice(0, (this.alarmCollection.length - 1)); // очистка коллекции звонков от 0-го до последнего элемента
    }

}



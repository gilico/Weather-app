const allDaysElement = document.querySelectorAll('.day');
const allFiveOptEle = document.querySelectorAll('.five-change-opt');
const allFiveDataEle = document.querySelectorAll('.five-change-cont');
const firstOpt = document.getElementById('0')
firstOpt.classList.add('chosen');




(function setDaysColor() {
    let i = 0
    allFiveDataEle.forEach(dataCont => {
        dataCont.id = i;
        if(dataCont.id > 0){
            dataCont.style.display = 'none';
        }
        i++;
    })

    allDaysElement.forEach(day => {
        const dayDescription = day.innerHTML;

        if (dayDescription.includes('clouds')) 
        {
            day.classList.add('clouds');
        }
        else if(dayDescription.includes('snow'))
        {
            day.classList.add('snow');
        }
        else if(dayDescription.includes('rain'))
        {
            day.classList.add('rainy');
        }
        else
        {
            day.classList.add('sunny');
        }
    })


    
})();


function SetDayForecast(element){
    allDaysElement.forEach((day) => {
        day.classList.remove('chosen');
    })

    element.classList.add('chosen');
    let elementId = element.id;

    allFiveDataEle.forEach(dataCont => {
        dataCont.style.display = 'none';
        if (dataCont.id === elementId) {
            dataCont.style.display = 'unset';
        }
    })
}



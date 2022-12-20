export const Time = (count:number) => {
    //Initial value, in case we don`t set minutes or hours to show them correctly
    let seconds:number | string = '00'
    let minutes:number | string='00'
    let hours:number | string='00'
    //Math part
    if (count < 60){
        seconds=count
    }
    else if (count >= 60 && count < 3600){
        minutes=Math.floor(count / 60)
        seconds=count % 60
    }
    else if (count >= 3600){
        hours=Math.floor(count / 3600)
        minutes=Math.floor(count % 3600 / 60)
        seconds=Math.floor(count % 3600 % 60)
    }
    //Adding 0 before time value in case its value below 10, so it will be not 4:6:3 but 04:06:03
    if(String(seconds).length<2) seconds='0'+seconds
    if(String(minutes).length<2) minutes='0'+minutes
    if(String(hours).length<2) hours='0'+hours

    return {seconds,minutes,hours}
}
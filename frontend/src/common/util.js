export default {
    makeDateStr : function(year, month, day, type){
        return year + type + ( (month < 10) ? '0' + month : month ) + type + ( (day < 10) ? '0' + day : day );
    },
    makeTimeStr : function(hour, minute, second, type){
        return hour + type + ( (minute < 10) ? '0' + minute : minute ) + type + ( (second < 10) ? '0' + second : second );
    }
  }
// 手动增加小时
input.onButtonPressed(Button.A, function () {
    if (hours < 23) {
        minutes += 1
    } else {
        hours = 0
    }
})
input.onGesture(Gesture.Shake, function () {
    // adjust
    // 调整后的小时数
    // 比如，把20点改成8点，“8”就是adjust
    adjust = hours
    // 判断显示模式，是24小时还是12小时模式
    if (ampm) {
        // 将24小时模式的小时数，转换成12小时模式
        if (hours > 12) {
            adjust = hours - 12
        } else {
            if (hours == 0) {
                adjust = 12
            }
        }
    }
    // 举例：
    // 20:35
    // ->
    // 8:35
    // 
    // 35 除以 10 的floor是 3
    // 35 除以 10 的余数是 5
    // 3和5组合字符串35
    time = " " + adjust
    time = "" + time + ":"
    time = "" + time + Math.floor(minutes / 10)
    time = "" + time + minutes % 10
    // 8:35 PM
    if (ampm) {
        if (hours > 11) {
            time = "" + time + "PM"
        } else {
            time = "" + time + "AM"
        }
    }
})
// 切换显示模式：
// 12小时或
// 24小时
input.onButtonPressed(Button.AB, function () {
    ampm = !(ampm)
})
// 手动增加分钟
input.onButtonPressed(Button.B, function () {
    if (minutes < 59) {
        minutes += 1
    } else {
        minutes = 0
    }
})
let hours = 0
let minutes = 0
let adjust = 0
let time = ""
let ampm = false
// 显示am早上，pm下午吗？
// 还是显示24小时的模式，默认是24小时模式
ampm = false
// 时间变量time，使用字符串类型
time = ""
// adjust
// 调整后的小时数
// 比如，把20点改成8点，“8”就是adjust；
// 具体逻辑参照“当振动时”
// -----------------------------
// 实际上课中：
// 教师可以把模式切换去掉
// 只用24小时的显示模式，根据具体情况来讲解。
adjust = 0
// 分钟变量
minutes = 0
// 小时变量
hours = 0
basic.forever(function () {
    // 每过60秒
    basic.pause(60000)
    // 判断分钟，到59的时候可以继续加1分钟；
    // 否则（满60分钟，即61的时候），分钟归零
    if (minutes < 59) {
        minutes += 1
    } else {
        // 分钟归零后，判断小时，原理和分钟一样，满24后，归零凌晨时间
        minutes = 0
        if (hours < 23) {
            minutes += 1
        } else {
            hours = 0
        }
    }
})
basic.forever(function () {
    basic.showString(time)
})

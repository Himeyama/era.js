class Era extends Date{

    static erasData = [
        ["明治", 1868, 10, 23],
        ["大正", 1912, 7, 30],
        ["昭和", 1926, 12, 25],
        ["平成", 1989, 1, 8],
        ["令和", 2019, 5, 1]
    ]

    static initial = {
        "明治": "M",
        "大正": "T",
        "昭和": "S",
        "平成": "H",
        "令和": "R"
    }

    static e = {}

    static era(){
        if(Object.keys(this.e).length == 0){
            let eras = {}
            this.erasData.forEach((e, i) => {
                eras[e[0]] = new Date(e[1], e[2]-1, e[3])
            })
            this.e = eras
        }
        return this.e
    }

    constructor(...date){
        super(...date)
    }

    getEra(){
        let w = Era.era()
        let e = Object.keys(w)
        let l = e.length
        let i
        for(i = 0; i < l; i++)
            if(
                (
                    i != l - 1 && w[e[i]] <= this &&
                    this < w[e[i+1]]
                ) || (
                    i == l - 1 && w[e[i]] <= this
                )
            ) break
        return e[i]
    }

    getDateAry(){
        return [
            this.getEra(),
            this.getFullYear() - Era.era()[this.getEra()].getFullYear() + 1,
            this.getMonth() + 1,
            this.getDate()
        ]
    }

    getWareki(cal="和暦", short=true, type=0){
        let e = this.getDateAry()
        let y = this.getFullYear()
        let y2 = y - 2000
        let m = this.getMonth() + 1
        let m2 = ("00" + m).slice(-2)
        let d = this.getDate()
        let d2 = ("00" + d).slice(-2)
        let day = ["日", "月", "火", "水", "木", "金", "土"][this.getDay()]
        let dayES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][this.getDay()]
        let dayE = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][this.getDay()]
        let era = e[0]
        let ye = e[1]
        if(cal == "西暦"){
            if(short){
                if(type == 0)
                    return `${y}/${m2}/${d2}`
                else if(type == 1)
                    return `${y2}/${m2}/${d2}`
                else if(type == 2)
                    return `${y2}/${m}/${d}`
                else if(type == 3)
                    return `${y}/${m}/${d}`
                else if(type == 4)
                    return `${y}-${m2}-${d2}`
                else if(type == 5)
                    return `西暦${y2}年${m}月${d}日(${day})`
            }else{
                if(type == 0)
                    return `${y}年${m}月${d}日`
                else if(type == 1)
                    return `${y}年${m2}月${d2}日`
                else if(type == 2)
                    return `${y}年${m}月${d}日 ${day}曜日`
                else if(type == 3)
                    return `${y}年${m2}月${d2}日 ${day}曜日`
                else if(type == 4)
                    return `西暦${y2}年${m}月${d}日 ${day}曜日`
            }
        }else if(cal == "和暦"){
            if(short){
                if(type == 0)
                    return `${era}${ye}年${m}月${d}日`
                if(type == 1)
                    return `${era}${ye}/${m}/${d}`
                if(type == 2)
                    return `${era}${ye}年${m}月${d}日(${day})`
                if(type == 3)
                    return `${ye}/${m}/${d}`
                if(type == 4)
                    return `${era}${ye}/${m2}/${d2}`
                if(type == 5)
                    return `${ye}/${m2}/${d2}`
            }else{
                if(type == 0)
                    return `${era}${ye}年${m}月${d}日 ${day}曜日`
                if(type == 1)
                    return `${era}${ye}年${m2}月${d2}日`
                if(type == 2)
                    return `${era}${ye}年${m2}月${d2}日 ${day}曜日`
                if(type == 3)
                    return `${ye}年${m}月${d}日`
            }
        }
    }

    static date2wareki(id, cal="和暦", short=true, type=0){
        let e = document.getElementById(id)
        e.innerText = (new Era(e.innerText)).getWareki(cal, short, type)
    }
}
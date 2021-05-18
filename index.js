function Tromino(container, options) {
  this.message = new Array(options.size).fill(0).map(() => new Array(options.size).fill(0))
  this.container = container
  this.size = options.size
  this.loseX = options.lose.x
  this.loseY = options.lose.y
  this.doms = []
  this.number = 1
  this.init()
}

//按照输入的行和列创造格子
Tromino.prototype.createTable = function () {
  const height = this.container.clientHeight / this.size
  const width = this.container.clientWidth / this.size
  this.message.forEach((item, j) => {
    item.forEach((_, i) => {
      if (i === this.loseX && j === this.loseY) {
        this.doms.push(`<div style="height:${height}px;width:${width}px;" class="lose"></div>`)
      } else {
        this.doms.push(`<div style="height:${height}px;width:${width}px;"></div>`)
      }
    })
  })
  this.container.innerHTML = this.doms.join("")
  this.doms = this.container.querySelectorAll("div")
}

Tromino.prototype.init = function () {
  this.message[this.loseX][this.loseY] = -1
  this.createTable()
  this.run_L(this.size / 2, this.size / 2, this.loseX, this.loseY, this.size)
  this.getColor()
  // this.putNumber()
}

Tromino.prototype.getColor = function () {
  var colors = [
    "#fff5ab",
    "#1eae98",
    "#867ae9",
    "#c449c2",
    "#64dfdf",
    "#a9f1df",
    "#ff7b54",
    "#f5abc9",
    "#ffcead",
    "#ffd56b",
    "#ffe5e2",
    "#ffe227",
    "#e93b81",
    "#f55c47",
    "#bee5d3",
    "#74c7b8",
  ]
  const len = colors.length
  this.message.forEach((item, j) => {
    item.forEach((_, i) => {
      if (this.message[i][j] != 0 && this.message[i][j] != -1) {
        const num = this.message[i][j] % len
        this.doms[i * this.size + j].style.backgroundColor = colors[num]
      } else {
        this.doms[i * this.size + j].style.backgroundColor = "#000"
      }
    })
  })
}

Tromino.prototype.putNumber = function () {
  for (var i = 0; i < this.tr; i++) {
    for (var j = 0; j < this.td; j++) {
      this.doms[i][j].innerHTML = this.message[i][j]
    }
  }
}

Tromino.prototype.run_L = function (centerX, centerY, loseX, loseY, len) {
  if (len < 2) {
    return
  }
  const count = len / 4

  //缺失的方块在左上方
  if (loseX < centerX && loseY < centerY) {
    this.message[centerX - 1][centerY] = this.number
    this.message[centerX][centerY] = this.number
    this.message[centerX][centerY - 1] = this.number
    // console.log("左上方", this.number)
    // console.log(centerX - 1, centerY)
    // console.log(centerX, centerY)
    // console.log(centerX, centerY - 1)
    // console.log("--------------")
    this.run_L(centerX + count, centerY - count, centerX, centerY - 1, len / 2) //右上角
    this.run_L(centerX + count, centerY + count, centerX, centerY, len / 2) //左上角
    this.run_L(centerX - count, centerY + count, centerX - 1, centerY, len / 2) //左下角
    this.run_L(centerX - count, centerY - count, loseX, loseY, len / 2) //缺失的
  }
  //缺失的方块在左下方
  else if (loseX >= centerX && loseY < centerY) {
    // console.log('左下方');
    this.message[centerX - 1][centerY] = this.number
    this.message[centerX][centerY] = this.number
    this.message[centerX - 1][centerY - 1] = this.number
    // console.log("左下方", this.number)
    // console.log(centerX - 1, centerY)
    // console.log(centerX, centerY)
    // console.log(centerX - 1, centerY - 1)
    // console.log("------------")
    this.run_L(centerX - count, centerY - count, centerX - 1, centerY - 1, len / 2) //右下角
    this.run_L(centerX + count, centerY + count, centerX, centerY, len / 2) //左上角
    this.run_L(centerX - count, centerY + count, centerX - 1, centerY, len / 2) //左下角
    this.run_L(centerX + count, centerY - count, loseX, loseY, len / 2) //缺失的
  }
  //缺失的方块在右上方
  else if (loseX < centerX && loseY >= centerY) {
    // console.log('右上方');
    this.message[centerX][centerY - 1] = this.number
    this.message[centerX][centerY] = this.number
    this.message[centerX - 1][centerY - 1] = this.number
    // console.log("右上方", this.number)
    // console.log(centerX, centerY - 1)
    // console.log(centerX, centerY)
    // console.log(centerX - 1, centerY - 1)
    // console.log("------------")
    this.run_L(centerX + count, centerY - count, centerX, centerY - 1, len / 2) //右上角
    this.run_L(centerX + count, centerY + count, centerX, centerY, len / 2) //左上角
    this.run_L(centerX - count, centerY - count, centerX - 1, centerY - 1, len / 2) //右下角
    this.run_L(centerX - count, centerY + count, loseX, loseY, len / 2) //缺失的
  }
  //缺失的方块在右下方
  else {
    // console.log('右下方');
    this.message[centerX - 1][centerY] = this.number
    this.message[centerX - 1][centerY - 1] = this.number
    this.message[centerX][centerY - 1] = this.number
    // console.log("右下方", this.number)
    // console.log(centerX - 1, centerY)
    // console.log(centerX - 1, centerY - 1)
    // console.log(centerX, centerY - 1)
    // console.log("------------")
    this.run_L(centerX - count, centerY - count, centerX - 1, centerY - 1, len / 2) //右下角
    this.run_L(centerX - count, centerY + count, centerX - 1, centerY, len / 2) //左下角
    this.run_L(centerX + count, centerY - count, centerX, centerY - 1, len / 2) //右上角
    this.run_L(centerX + count, centerY + count, loseX, loseY, len / 2) //缺失的
  }
  this.number++
}

//获取输入的需求信息
const box = document.querySelector(".tromino_box")

document.querySelector(".show_tromino").onclick = function () {
  const size = Math.pow(2, parseInt(document.querySelector(".tromino_size").value))
  const line = parseInt(document.querySelector(".lose_line").value)
  const column = parseInt(document.querySelector(".lose_column").value)
  if (line >= size || column >= size || line < 0 || column < 0) {
    alert("输入的缺失位置不对")
    return
  }
  const options = {
    size,
    lose: {
      x: column,
      y: line,
    },
  }
  new Tromino(box, options)
}

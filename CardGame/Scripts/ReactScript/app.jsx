import React from "react"
/*
 * Author: Mike Mao Che
 * To display most of the cards, referenced to tiles and 
 * Make a tile function to pick up easily any cards on the image
 * */
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            card: {
                xtile: 936, // red face: x: 936, y: 0
                ytile: 0,
                xcanvas: 45,
                ycanvas: 25,
                swidth:71,
                sheight: 96,
                width: 80,
                height: 100

            },
            isCardClicked: false,
            countPointsCard: 0,
            isGameOver: false,
            stopBtn: false,
            bankerScore: 0
        }

        this.handleCardClicked = this.handleCardClicked.bind(this)
        this.pickupRandomCard = this.pickupRandomCard.bind(this)
        this.addPointsCard = this.addPointsCard.bind(this)
        this.gameOver = this.gameOver.bind(this)
        this.stop = this.stop.bind(this)
        this.restart = this.restart.bind(this)
    }

    componentDidMount() {
        this.gameBegins()
    }

    gameBegins() {
        const { xtile, ytile, xcanvas, ycanvas, swidth, sheight, width, height } = this.state.card
        this.drawCards(xtile, ytile, xcanvas, ycanvas, swidth, sheight, width, height)
        this.banker()
    }
    
    loadImg(url) {
        return new Promise((resolved,rejected) => {
            const img = new Image()
            img.addEventListener('load', () => {
                resolved(img)
            })
            img.src = url
        })
    }

    drawCards(xtile, ytile, xcanvas, ycanvas, swidth, sheight, width, height) {
        var canvas = $("#game")[0]
        var ctx = canvas.getContext("2d")
        // draw map / inside the tile sx,sy,swidth,sheight / on canvas x,y,width,height
        this.loadImg("/images/cards.png").then((img) => {
            ctx.drawImage(img, xtile, ytile, swidth, sheight, xcanvas, ycanvas, width, height)
        })
    }

    // x: 280-485, y:183-575
    handleCardClicked(e) {
        let isCardClicked = e.clientX >= 280 && e.clientX <= 485
        isCardClicked = e.clientY >= 183 && e.clientY <= 575
        this.setState({
            isCardClicked: isCardClicked
        }, () => this.redraw())
    }

    redraw() {
        const { xtile, ytile, xcanvas, ycanvas, swidth, sheight, width, height } = this.state.card
        if (this.state.isCardClicked && !this.state.isGameOver && !this.state.stopBtn) {
            // random card
            var card = this.pickupRandomCard()
            // calc the cards cumulated
            var points = this.addPointsCard(card)
            this.drawCards(xtile, ytile, 160, 25, swidth, sheight, width, height)
            this.gameOver(points)
        }
    }

    pickupRandomCard() { // 52 cards
        return Math.floor(Math.random() * Math.floor(51))
    }

    addPointsCard(card) {
        let countPointsCard = this.state.countPointsCard
        switch (card) {
            case 0: case 13: case 26: case 39: // AS
                    case 10: case 11: case 12: // first row K/Q/V
                    case 25: case 24: case 23:
                    case 38: case 37: case 36:
                    case 51: case 50: case 49: // end of the row
                countPointsCard += 10
                break;
            case 1: case 14: case 27: case 40: // 2
                countPointsCard += 2
                break;
            case 2: case 15: case 28: case 41: // 3
                countPointsCard += 3
                break;
            case 3: case 16: case 29: case 42: // 4
                countPointsCard += 4
                break;
            case 4: case 17: case 30: case 43: // 5
                countPointsCard += 5
                break;
            case 5: case 18: case 31: case 44: // 6
                countPointsCard += 6
                break;
            case 6: case 19: case 32: case 45: // 7
                countPointsCard += 7
                break;
            case 7: case 20: case 33: case 46: // 8
                countPointsCard += 8
                break;
            case 8: case 21: case 34: case 47: // 9
                countPointsCard += 9
                break;
            case 9: case 22: case 35: case 48: // 10
                countPointsCard += 10
                break;
            default:
                console.log("error : ", card)
                break;
        }
        this.setState({
            countPointsCard: countPointsCard
        })
        return countPointsCard
    }

    gameOver(points) {
        var canvas = $("#game")[0]
        var ctx = canvas.getContext("2d")
        let msg = points < 21 ? "" : points == 21 && this.state.bankerScore < points ? "Black Jack !" : "Game Over !"
        let isGameOver= points < 21 ? false  : points >= 21

        ctx.font = "25px Calibri"
        ctx.fillText(msg, 92, 20)
        this.setState({
            isGameOver: isGameOver
        })
    }

    banker() {
        let bankerScore = 0
        while (bankerScore < 15) {
            bankerScore = Math.floor(Math.random() * Math.floor(21)) + 1
        }
        this.setState({ bankerScore: bankerScore})
    }

    stop()    {
        var canvas = $("#game")[0]
        var ctx = canvas.getContext("2d")
        let isGameOver = this.state.bankerScore >= this.state.countPointsCard
        let msg = isGameOver ? "Banker Won !" : "You Won !"

        ctx.font = "25px Calibri"
        ctx.fillText(msg, 92, 20)
        this.setState({
            isGameOver: isGameOver,
            stopBtn: true
        })
    }

    restart() {
        // clear canvas
        var canvas = $("#game")[0]
        var ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // reset points
        this.setState({
            isCardClicked: false,
            countPointsCard: 0,
            isGameOver: false,
            stopBtn: false,
            bankerScore: 0
        })
        this.gameBegins()
    }

    render() {
        return (
            <React.Fragment>
                <div className="ui container">
                    <div className="ui fluid grid">
                        <div className="column">
                            <div className="ui inverted segment">
                                <div className="ui inverted secondary pointing menu">
                                    <a className="active item">
                                        <h1 className="ui header red">
                                        <img className="ui image" src="/images/blackjack.jpg" />
                                            <div className="content">
                                                Black Jack
                                            </div>
                                        </h1>
                                    </a>
                                </div>
                            </div>
                            <div className="ui segment">
                                <table className="ui inverted centered table">
                                    <thead>
                                        <tr className="center aligned">
                                            <th>
                                                <a className="ui green label large">
                                                    {"Banker Points: "} {this.state.bankerScore < 10 ? "0" + this.state.bankerScore : this.state.bankerScore}
                                                </a>
                                            </th>
                                            <th>VS</th>
                                            <th>
                                                <a className="ui orange label large">{"Your Points: "}
                                                {this.state.countPointsCard < 10 ? "0" + this.state.countPointsCard : this.state.countPointsCard}
                                                </a>
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                                <canvas id="game" name="canvas" onClick={this.handleCardClicked}
                                    style={{
                                        backgroundColor: "green",
                                        width: 800, height: 600,
                                        display: "block",
                                        margin: "1em auto",
                                        outline: "4px solid rgba(255,0,0,0.6)"
                                    }}
                                >
                                </canvas>
                                <div className={`ui button fluid ${this.state.isGameOver || this.state.stopBtn ? "disabled" : ""}`}
                                    onClick={this.stop}>STOP</div>
                                <div className={`ui button fluid ${this.state.isGameOver || this.state.stopBtn ? "" : "disabled"}`}
                                    onClick={this.restart}>RESTART</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
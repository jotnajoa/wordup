export default class Radiates {


    constructor(x, y, radius, radSpeed, mag, radian, offCenter, index, length, rank, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.radSpeed = radSpeed;
        this.mag = mag;
        this.radian = radian;
        this.endPoint = { x, y };
        this.offCenter = offCenter;
        this.index = index;
        this.arcRad = 1
        this.length = length
        this.rad0 = 1;
        this.mag0 = 1;
        this.rank = rank;
        this.highlight = false;
        this.color = color
    };

    update() {
        this.radian += this.radSpeed
        if (this.rad0 < this.radius) {
            this.rad0 += 4;
        }


        if (this.mag0 < this.mag) {
            this.mag0 += 4;
        }

        this.x = this.rad0 * Math.cos(this.radian);
        this.y = this.rad0 * Math.sin(this.radian);
        this.endPoint.x = this.x + this.mag0 * Math.cos(this.radian)
        this.endPoint.y = this.y + this.mag0 * Math.sin(this.radian)
    };

    draw() {

        if (this.highlight == true) {
            context.strokeStyle = 'yellow';
            context.lineWidth = 1
            context.beginPath();
            context.moveTo(this.offCenter.x + this.x, this.offCenter.y + this.y);
            context.lineTo(this.offCenter.x + this.endPoint.x, this.offCenter.y + this.endPoint.y);
            context.stroke();
            context.closePath();
        } else {

            context.strokeStyle = this.color;
            context.lineWidth = 0.3
            context.beginPath();
            context.moveTo(this.offCenter.x + this.x, this.offCenter.y + this.y);
            context.lineTo(this.offCenter.x + this.endPoint.x, this.offCenter.y + this.endPoint.y);
            context.stroke();
            context.closePath();
        }


    }

    // drawoutline() {


    //     if (this.index == 0) {
    //         context.beginPath();
    //         context.strokeStyle = 'grey';
    //         context.lineWidth = 2
    //         context.moveTo(this.offCenter.x + this.x, this.offCenter.y + this.y);
    //         context.stroke();

    //     } else if (this.index != 0 && (this.mag > linScale(maxVal) / 3) && this.index < this.length - 1) {
    //         context.strokeStyle = 'grey';
    //         context.lineWidth = 2
    //         context.lineTo(this.offCenter.x + this.endPoint.x, this.offCenter.y + this.endPoint.y);
    //         context.stroke();

    //     } else if (this.index == this.length - 1) {
    //         context.strokeStyle = 'grey';
    //         context.lineWidth = 2
    //         context.lineTo(this.offCenter.x + this.endPoint.x, this.offCenter.y + this.endPoint.y);
    //         context.stroke();
    //         context.closePath();
    //         console.log('final');
    //     }

    // }
}
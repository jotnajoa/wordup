export default class Highlight {

    constructor(x, y, radius, radSpeed, mag, radian, offCenter, index, length) {
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
        this.gradient;
        this.gradient = context.createRadialGradient(this.offCenter.x, this.offCenter.y, 0, this.offCenter.x, this.offCenter.y, this.radius + this.mag);
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


    drawoutline() {
        context.strokeStyle = 'rgba(247,79,79,0.2)';
        context.lineWidth = 0.08


        if (this.index == 0) {
            context.beginPath();
            context.moveTo(this.offCenter.x + this.x, this.offCenter.y + this.y);
            context.stroke();

        } else if (this.index != 0 && (this.mag > linScale(maxVal) * 1 / 100) && this.index < this.length - 1) {

            context.lineTo(this.offCenter.x + this.endPoint.x, this.offCenter.y + this.endPoint.y);
            context.stroke();

        } else if (this.index == this.length - 1) {
            context.lineTo(this.offCenter.x + this.endPoint.x, this.offCenter.y + this.endPoint.y);
            context.stroke();

            context.closePath();

        }



        this.gradient.addColorStop(0, 'rgba(247,79,79,0.001)');
        this.gradient.addColorStop(1, 'rgba(247,79,79,0.004)');
        context.fillStyle = this.gradient
        context.fill()



    }



}
export default class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
}

export function addVectors(vec1, vec2){
    let outVector = new Vector3(vec1.x + vec2.x, vec1.y + vec2.y, vec1.z + vec2.z);
    return outVector;  
}

export function multiplyVectors(vec1, vec2){
    let outVector = new Vector3(vec1.x * vec2.x, vec1.y * vec2.y, vec1.z * vec2.z);
    return outVector;
}

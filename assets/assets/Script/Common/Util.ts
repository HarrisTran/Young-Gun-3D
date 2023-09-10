import { _decorator, Component, Node, Quat, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Util')
export class Util {
    static formatNumber(n : number){
        return Intl.NumberFormat().format(n);
    }
 
    static lerp(a: number, b: number, ratio: number){
        return a + (b-a)*ratio;
    }
 
    static RotationAroundNode(self: Node, pos: Vec3,axis: Vec3, angle: number):Quat{
        let _quat = new Quat();
 
        let v1 = new Vec3();
        let v2 = new Vec3();
 
        let pos2 : Vec3 = self.position;
 
        let rad = angle*Math.PI/180;
 
        Quat.fromAxisAngle(_quat,axis,rad);
 
        Vec3.subtract(v1,pos2,pos);
        Vec3.transformQuat(v2,v1,_quat);
 
        self.position = Vec3.add(v2,pos,v2);
 
        Quat.rotateAround(_quat,self.rotation,axis,rad);
 
        return _quat;
    }

    static pingPong(value:number, length: number) :number{
        let phase = value % (2*length);
        if(phase > length){
            phase = (2*length - phase);
        }
        return phase;
    }
}


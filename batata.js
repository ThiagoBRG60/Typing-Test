class Batata {
   constructor(array) {
     this.array = array
     this.callback = null
   }
 
   batata(callback) {
     if (typeof callback === "function") {
       this.callback = callback
       const novoArray = []
 
       for(let i = 0; i < this.array.length; i++) {
         novoArray.push(this.callback(this.array[i], i, this.array))
       }
       return novoArray
     }else {
       console.error("Precisa ser uma callback function");
       return []
     }
   }
 }
 
export function batata(callback) {
   const novaBatata = new Batata(this)
   return novaBatata.batata(callback)
 }
 
 Array.prototype.batata = batata
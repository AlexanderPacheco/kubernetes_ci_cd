interface ISubject {
  subscribe(observer: Observer):void 
  unsubscribe(observer: Observer):void 
  notify(news:String):void 
}

interface IObserver {
  update(news:string):void
}

export  class OperacionesAyDrive implements ISubject {
  private observers:Observer[] = [];
  subscribe(observer:Observer) {
      this.observers.push(observer)
  }
  unsubscribe(observer:Observer) {
      this.observers = this.observers.filter((element)=>{
          return observer.name === element.name
      })
  }
  notify(news:string) {
      this.observers.forEach(observer => {
          observer.update(news);
      })
  }
}

export class Observer implements IObserver {
  constructor(public readonly name:string) {}
  private feed:string[] = []; 
  update(news:string) {
      this.feed.push(news)
     console.log(`${this.name} , operacion dentro de gestor carpetas`)
  }
  showFeed() {
      console.log(this.name + ":" + this.feed)
  }
}


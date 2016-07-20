const Events = ('events');

var ClientPool = module.exports = exports = function(){
  this.pool = {};
  this.ee = new Events;
};

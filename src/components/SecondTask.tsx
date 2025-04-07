// задание 2
// Создать и встроить тут же компонент который принимает фио исполнителя, массив данных о майнкрафте
// формат массива (название моба, его картинка, id, и придумайте ему прозвище)
// все должно быть типизированно
// нужно чтобы в новом компоненте был список мобов и форма
// форма для добавления нового моба должна вызываться по нажатию на кнопку
// при нажатии на кнопку открывается модалка с формой
// при добавлении модалка закрывается
// при наведении просто визуально выделяется строчка
// при нажатии на строчку открывается модалка с инфой о мобе
// в окне с мобом должна быть кнопка удалить с соответствующим функционалом
// функцию добавления и удаления описать тут, а потом протипизировав передать его в ваш компонент

import { Component, MouseEventHandler, useState } from 'react';
import './../assets/minecraft.css';

type Mob = {
  name : string,
  image : string,
  id : number,
  nickname : string
};

function MobLine(prop: {mob: Mob, onClick: () => void }) {


  return <li onClick={prop.onClick}>
    <p>{prop.mob.id}) {prop.mob.name} [ {prop.mob.nickname} ] </p>
  </li>
}

function MobList(prop: {list : Array<Mob>, onMobClick: (mob: Mob) => void}) {
  return <ul className='line'>
    {prop.list.map(n => <MobLine key={n.id} mob={n} onClick={() => prop.onMobClick(n)}/>)}
  </ul>
}

function DetailMob(prop : {mob: Mob, removeclick: MouseEventHandler, cancelclick: MouseEventHandler}) {

  return <div className='window'>
    <form  className='windowform'>
      <p>Детали моба</p>
      <img src={prop.mob.image} style={{ width: 100, height: 100}}/>
      <p>ID: {prop.mob.id}</p>
      <p>name: {prop.mob.name}</p>
      <p>nickname: {prop.mob.nickname}</p>
      <button onClick={prop.removeclick}>Удалить</button>
      <button onClick={prop.cancelclick}>Отмена</button>
    </form>
  </div> 
}

function CreateMob(prop : {savemob: (mob: Mob) => void, cancelclick: MouseEventHandler}) {
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const okclick: MouseEventHandler = (e) => {
    e.preventDefault();
    const mob: Mob = { name, image, id, nickname }
    prop.savemob(mob);
  }

  return <div className='window'>
    <form  className='windowform'>
      <p>Создать нового моба</p>
      <label>ID:</label>
      <input type="number" value={id} onChange={(e) => setId(Number(e.target.value))} />
      <label>name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>nickname:</label>
      <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <label>image:</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      <button onClick={okclick}>ОК</button>
      <button onClick={prop.cancelclick}>Отмена</button>
    </form>
  </div> 
}

function Minecraft(prop: {executer : string}) {
  const [isNew, setIsNew] = useState(false);
  const [isLook, setIsLook] = useState(false);
  const [selectedMob, setSelectedMob] = useState<Mob | null>(null);
  const [moblist, setMoblist] = useState<Array<Mob>>([]);

  const showwindow: MouseEventHandler = (e) => { 
    e.preventDefault, 
    setIsNew(!isNew) 
  };

  const getmob: (newMob: Mob) => void = (newMob: Mob) => {
    setMoblist([...moblist, newMob]); // Добавляем нового моба в список
    setIsNew(false); // Закрываем окно создания моба
  };

  const showdetail: (newMob: Mob) => void = (mob: Mob) => {
    setSelectedMob(mob);
    setIsLook(!isLook);
  };

  const allcancel: MouseEventHandler = (e) => { 
    e.preventDefault, 
    setIsNew(false);
    setIsLook(false); 
  };

  const removemob: MouseEventHandler = (e) => {
    e.preventDefault; 
    if (selectedMob) {
      setMoblist(moblist.filter(m => m.id !== selectedMob.id));
      setIsLook(false);
      setSelectedMob(null);
    }
  };

  return <div>
    <p>{prop.executer}</p>
    {
      isNew ? (<CreateMob savemob={getmob} cancelclick={allcancel}/>) : <p></p>
    }
    {
      (isLook && selectedMob != null) ? (<DetailMob mob={selectedMob} removeclick={removemob} cancelclick={allcancel}/>) : <p></p>
    }

    <MobList list={moblist} onMobClick={showdetail}/>    
    <button onClick={showwindow}>Добавить</button>
  </div>
}

function SecondTask() {
  return <Minecraft executer="Spatial"/>;
}

export default SecondTask;

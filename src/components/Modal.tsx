import { ReactNode, useState } from 'react';
import Mob from './../types/Mob';
import Input from './Inputs';

export default function ModalWindow( {onCancelClick, children} : {onCancelClick: () => void, children: ReactNode}) {
  return <div className='window' onClick={onCancelClick}>
    <div  className='window__form' onClick={(e: React.MouseEvent) => {e.stopPropagation()}}>
      {children}
    </div>
  </div>
}
  
export function ModalMobDetail({mob, onRemoveClick, onCancelClick} : {mob: Mob, onRemoveClick: () => void, onCancelClick: () => void }) {
  return <>
    <p>Детали моба</p>
    <img src={mob.image} style={{ width: 100, height: 100}}/>
    <p className='mob__item__text'>ID: {mob.id}</p>
    <p className='mob__item__text'>name: {mob.name}</p>
    <p className='mob__item__text'>nickname: {mob.nickname}</p>
    <button onClick={onRemoveClick}>Удалить</button>
    <button onClick={onCancelClick}>Отмена</button>
  </>
}

export function ModalMobCreate({onSaveMob, onCancelClick} : {onSaveMob: (mob: Mob) => void, onCancelClick: () => void }) {
  const [newMob, setNewMob] = useState<Mob>({
    "id": 0,
    "name" : "",
    "nickname": "",
    "image": ""
  });

  const onSubmit: (e: React.FormEvent) => void = (e: React.FormEvent) => {
      e.preventDefault();
      onSaveMob(newMob);
  }
  
  return <form  className='window__form' onSubmit={onSubmit}>
      <p>Создать нового моба</p>
      <Input type="number" label="ID:" value={newMob.id} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMob( {...newMob, "id": Number(e.target.value)} )}/>
      <Input type="text" label="name:" value={newMob.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMob( {...newMob, "name": e.target.value} )}/>
      <Input type="text" label="nickname:" value={newMob.nickname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMob( {...newMob, "nickname": e.target.value} )}/>
      <Input type="text" label="image:" value={newMob.image} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMob( {...newMob, "image": e.target.value} )}/>
      <button type='submit'>ОК</button>
      <button onClick={onCancelClick}>Отмена</button>
  </form>
}

export function AlertMessage({message} : {message: string}) {
  return <div className='alert__block'>
    <p className="alert">{message}</p>
  </div>
}
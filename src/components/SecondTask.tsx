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

import { useState } from 'react';
import { executor } from '../config';
import './../assets/minecraft.css';
import Mob from './../types/Mob';
import MobListMock from './../mocks/MobList';
import ModalWindow from './Modal';
import { ModalMobDetail, ModalMobCreate, AlertMessage } from './Modal';
import MobList from './MobList';

function MinecraftMobManager({executer}: {executer : string}) {
  const [isModal, setIsModal] = useState<("new" | "detail" | null)>(null);
  const [selectedMobID, setSelectedMobID] = useState<number | null>(null);
  const [moblist, setMoblist] = useState<Array<Mob>>(MobListMock);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const onCreateMob: () => void = () => { 
    setTimeout(() => {
      setIsModal("new");
    }, 350);
  };

  const onAppendMob: (newMob: Mob) => void = (newMob: Mob) => {
    setTimeout(() => {
      if (newMob.name === "" || newMob.nickname === "" || newMob.image === "")
      {
        setAlertMessage("Заполните все поля!");
        return;
      }
      if (moblist.find(n => (n.id === newMob.id)) !== undefined || newMob.id <= 0)
        {
          setAlertMessage("ID моба не должен повторяться и должен быть больше нуля!");
          return;
        }
      setMoblist([...moblist, newMob]);
      setAlertMessage(null);
      setIsModal(null);
    }, 350);
  };

  const onMobItemClick: (mobID: number) => void = (mobID: number) => {
    setTimeout(() => {
      setSelectedMobID(mobID);
      setIsModal("detail");
    }, 350);
  };

  const onCloseModal: () => void = () => { 
    setTimeout(() => {
      setIsModal(null);
    }, 350);
  };

  const onRemoveMobItem: () => void = () => {
    setTimeout(() => {
      if (selectedMobID) {
        setMoblist(moblist.filter(m => m.id !== selectedMobID));
        setIsModal(null);
        setSelectedMobID(null);
      }
    }, 350);
  };

  const selectedMob = moblist.find(n => (n.id == selectedMobID));

  return <div>    
    <p>{executer}</p>
    { isModal == 'new' && (<ModalWindow onCancelClick={onCloseModal}>
      <ModalMobCreate onSaveMob={onAppendMob} onCancelClick={onCloseModal}/>
    </ModalWindow> )}
    { (isModal == 'detail' && selectedMob !== undefined) && (<ModalWindow onCancelClick={onCloseModal}>
      <ModalMobDetail mob={selectedMob} onRemoveClick={onRemoveMobItem} onCancelClick={onCloseModal}/>
    </ModalWindow> )}
    { moblist.length !== 0 ? <MobList moblist={moblist} onItemClick={onMobItemClick}/>    
      : <p>Список мобов пуст</p> }
    <button onClick={onCreateMob}>Добавить</button>
    { alertMessage && <AlertMessage message={alertMessage}/> }
  </div>
}

function SecondTask() {
  return <MinecraftMobManager executer={executor}/>;
}

export default SecondTask;

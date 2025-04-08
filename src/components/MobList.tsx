import Mob from './../types/Mob';

export function MobListItem({mob, onClick}: {mob: Mob, onClick: () => void }) {
  return <li onClick={onClick} className='mob__item'>
    <img src={mob.image} className='mob__item__image'/>
    <p className='mob__item__header'>{`${mob.name} [ ${mob.id} ]`} </p>
    <p className='mob__item__text'>{mob.nickname} </p>
  </li>
}

export default function MobList( {moblist, onItemClick} : {moblist : Array<Mob>, onItemClick: (mobID: number) => void}) {
  return <ul>
    {moblist.map((n, index) => <MobListItem key={index} mob={n} onClick={() => onItemClick(n.id)}/>)}
  </ul>
}
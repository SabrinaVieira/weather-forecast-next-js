import { useState } from "react"

const INITIAL_VALUE_LIST = ['Sabrina', 'Gabriel', 'Natan'];

export default function ListComponent() {
    const [list, setlist] = useState(INITIAL_VALUE_LIST);
    
    const addToList = () => {
        setlist(state => [...state, 'Novo'])
    }
    return (
        <div>
            <button onClick={addToList}>
                Adicionar
            </button>

            <ul>
                {list.map((item, index) =>
                    <li key={index}>
                        {item}
                    </li>
                )}
            </ul>
            )
        </div>
    )
}
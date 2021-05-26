import React, { useContext } from 'react'
import BlockchainContext from '../BlockchainContext';
import { RegisterForm } from '../components/user/RegisterForm';
import { Welcome } from '../components/user/Welcome';

export const Home = () => {
    const { user } = useContext(BlockchainContext);
    return (
        <div>
            {!!user ?
            <div>
                <Welcome user={user}/>
            </div>
                :
                <RegisterForm />
            }
        </div>
    )
}

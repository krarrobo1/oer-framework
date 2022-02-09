import React, { useContext } from 'react';
import BlockchainContext from 'src/BlockchainContext';
import { RegisterForm } from 'src/components/user/RegisterForm';
import { Welcome } from 'src/components/user/Welcome';

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

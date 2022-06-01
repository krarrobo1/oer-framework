import React, { useContext, useState } from 'react';
import BlockchainContext from 'src/BlockchainContext';
import { Message } from 'src/components/misc/Message';
import { RegisterForm } from 'src/components/user/RegisterForm';
import { Welcome } from 'src/components/user/Welcome';

export const Home = () => {
    const { user,
        web3,
        userListContract,
        accounts,
        setUser,
    } = useContext(BlockchainContext);

    const [errors, setErrors] = useState(undefined);

    return (
        <div>
            {errors && <Message text={errors} variant="danger" />}
            {!!user ?
                <div>
                    <Welcome user={user} />
                </div>
                :
                <RegisterForm
                    web3={web3}
                    userListContract={userListContract}
                    accounts={accounts}
                    setUser={setUser}
                    setErrors={setErrors}
                />
            }
        </div>
    )
}

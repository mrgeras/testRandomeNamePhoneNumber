// Мы ожидаем, что Вы исправите синтаксические ошибки, сделаете перехват возможных исключений и улучшите читаемость кода.
// А так же, напишите кастомный хук useThrottle и используете его там где это нужно.
// Желательно использование React.memo и React.useCallback там где это имеет смысл.
// Будет большим плюсом, если Вы сможете закэшировать получение случайного пользователя.
// Укажите правильные типы.
// По возможности пришлите Ваш вариант в https://codesandbox.io
import React, { useState, useCallback, useMemo } from 'react';
import { User } from '../types/typeUser';
import './GetRandomUser.css';
import Button from './Button'
import UserInfo from './UserInfo';

const URL = 'https://jsonplaceholder.typicode.com/users';

const useThrottle = (callback: () => void, limit: number) => {
  const throttling = React.useRef(false);
  return useCallback(() => {
    if (!throttling.current) {
      callback();
      throttling.current = true;
      setTimeout(() => (throttling.current = false), limit);
    }
  }, [callback, limit]);
};

function GetRandomUser() {
  const [item, setItem] = useState<User | null>(null);
  const [cache, setCache] = useState<Record<number, User>>({});

  const receiveRandomUser = useCallback(async () => {
    try {
      const id = Math.floor(Math.random() * 10) + 1;
      if (cache[id]) {
        setItem(cache[id]);
        return;
      }

      const response = await fetch(`${URL}/${id}`);
      const user = (await response.json()) as User;
      setCache((prevState) => ({ ...prevState, [id]: user }));
      setItem(user);
    } catch (e) {
      console.error(e);
    }
  }, [cache]);

  const throttledReceiveRandomUser = useThrottle(receiveRandomUser, 2000);

  const handleButtonClick = useCallback(() => {
    throttledReceiveRandomUser();
  }, [throttledReceiveRandomUser]);

  const MemoizedButton = useMemo(() => {
    return <Button onClick={handleButtonClick} />;
  }, [handleButtonClick]);

  return (
    <>
      <div className='user-info'>
        <header className='user-header'>
          <h1>Get a random user</h1>
        </header>

        <div className='btn-container'>{MemoizedButton}</div>
      </div>
      <div>
        <UserInfo user={item} />
      </div>
    </>
  );
}

export default GetRandomUser;

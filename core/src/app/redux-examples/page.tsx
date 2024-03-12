'use client';

import { useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import {
  UserState,
  selectUserState,
  selectUserName,
  login,
  logout,
} from '@/lib/redux/features/tmp/basicSlice';
import {
  selectAsyncState,
  asyncFuncWithData,
} from '@/lib/redux/features/tmp/asyncSlice';
import { useGetPokemonByNameQuery } from '@/lib/redux/features/tmp/pokemonApi/pokemonApi';
import { useLazyGetSimplePriceQuery } from '@/lib/redux/features/tmp/coinGeckoApi/coinGeckoEndpoint';

export default function Redux() {
  const userState = useAppSelector(selectUserState);
  const userName = useAppSelector(selectUserName);
  const asyncState = useAppSelector(selectAsyncState);
  const dispatch = useAppDispatch();

  const [userNameInput, setUserNameInput] = useState('');

  const { data, error, isLoading, isSuccess } =
    useGetPokemonByNameQuery('bulbasaur');

  const pokemonName = userNameInput ? 'pikachu' : null;
  const pokemonPikachu = useGetPokemonByNameQuery(pokemonName ?? skipToken);

  const [trigger, result, lastPromiseInfo] = useLazyGetSimplePriceQuery();
  const handleTrigger = () => {
    trigger({
      ids: 'ethereum',
      vsCurrencies: 'usd',
    });
  };

  return (
    <main className="prose lg:prose-xl my-2">
      <h1>Redux Usage Examples</h1>

      <h2>1. Basic Usage</h2>
      <div>
        <input
          type="text"
          value={userNameInput}
          onChange={(event) => setUserNameInput(event.target.value)}
          className="input input-primary mr-2"
          placeholder="User Name"
        />
        <button
          className="btn btn-primary mr-2"
          onClick={() => dispatch(login(userNameInput))}
        >
          Login
        </button>
        <button
          className="btn btn-secondary mr"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </div>
      {userState === UserState.LoggedIn ? (
        <p>Logged in as {userName}</p>
      ) : (
        <p>Not logged in</p>
      )}

      <h2>2. Get Some Async Data</h2>
      <button
        className="btn btn-primary"
        onClick={() => dispatch(asyncFuncWithData())}
      >
        Get Async Data
      </button>
      <p>Status: {asyncState.status}</p>
      <p>Data: {asyncState.data}</p>

      <h2>3. Redux Query Pokemon</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess ? (
        <p>{data.species.name}</p>
      ) : (
        <p>error: Unexpected error happened...</p>
      )}

      <h2>4. Redux Query Pokemon if there is user name</h2>
      {pokemonPikachu.isLoading ? (
        <p>Loading...</p>
      ) : pokemonPikachu.isSuccess ? (
        <p>{pokemonPikachu.data.species.name}</p>
      ) : pokemonPikachu.isUninitialized ? (
        <p>Not initialized</p>
      ) : (
        <p>error: Unexpected error happened...</p>
      )}

      <h2>5. Redux Query coinGeckoApi manually</h2>
      <button className="btn btn-primary" onClick={() => handleTrigger()}>
        Fetch Data Manually
      </button>
      {result.isUninitialized ? null : result.isFetching ? (
        <p>Loading...</p>
      ) : result.isSuccess ? (
        <p>1 eth = {(result.data as any)?.ethereum?.usd ?? 'no data'} usd</p>
      ) : (
        <p>error: Unexpected error happened...</p>
      )}
    </main>
  );
}

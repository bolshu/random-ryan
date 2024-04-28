"use client";
import { FC, useState, useCallback } from "react";
import InputText, { InputTextProps } from "@/components/InputText/InputText";
import styles from "./page.module.css";

type Member = {
  id: number;
  value?: string;
};

const Home: FC = () => {
  const [winner, setWinner] = useState<string>();
  const [members, setMembers] = useState<Member[]>([]);

  const handleAddMember = useCallback(() => {
    const newMember = { id: Date.now() };

    setMembers((prev) => [...prev, newMember]);
  }, []);

  const handleSubmit = useCallback(() => {
    const winnedID = Math.floor(Math.random() * members.length);

    setWinner(members[winnedID].value);
  }, [members]);

  const handleChangeMemberName = useCallback((id: number, value?: string) => {
    if (!value) return;

    setMembers((prev) =>
      prev.map((it) => {
        if (id !== it.id) {
          return it;
        }

        return {
          ...it,
          value,
        };
      })
    );
  }, []);

  const handleRemoveMember = useCallback((id: number) => {
    setMembers((prev) => [...prev.filter((it) => id !== it.id)]);
  }, []);

  return (
    <>
      {members.map(({ id, value }) => {
        return (
          <InputText
            key={id}
            id={id}
            defaultValue={value}
            onChange={handleChangeMemberName}
            onRemove={handleRemoveMember}
          />
        );
      })}

      <button onClick={handleAddMember}>add member</button>

      <button onClick={handleSubmit}>Chose Ryan!</button>

      {winner && <h1>{winner}</h1>}
    </>
  );
};

export default Home;

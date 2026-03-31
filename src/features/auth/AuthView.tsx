"use client";

import { useState } from "react";

import { Card, CardFooter } from "@/src/components/ui/card";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/ResgiterForm";


export default function AuthView() {
    const [tabForm, setTabForm] = useState<'login' | 'register'>('login')

    function handleTabForm() {
        setTabForm(prev => prev === 'login' ? 'register' : 'login')
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            {tabForm === 'login' ? <LoginForm /> : <RegisterForm handleTabForm={handleTabForm}/>}
            <CardFooter>
                <button className="cursor-pointer hover:text-zinc-800" onClick={handleTabForm}>{tabForm === 'login' ? 'Faça uma conta' : 'Já tem uma conta?'}</button>
            </CardFooter>
        </Card>
    )
}
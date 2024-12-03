import React, { useState } from 'react';

import Imagen from '../assets/sign-up.png'
import ImagenUserIcon from '../assets/userIcon.png'
import appFirebase from '../credenciales.js'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
const auth = getAuth(appFirebase)

const Login = () => {

    const[registrando, setRegistrando] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   

    const functAutenticacion = async(e) =>{
        e.preventDefault();
        const correo = e.target.email.value;
        const contraseña = e.target.password.value;
        if(registrando){
            try {
                await createUserWithEmailAndPassword(auth, correo, contraseña)
                
            } catch (error) {
                alert("Asegurese que la contraseña tenga mas de 8 caracteres")
            }
        }else{
            try {
                await signInWithEmailAndPassword(auth, correo, contraseña)
            } catch (error) {
                alert("El correo o la contraseña son incorrectos")
                setEmail("");
                setPassword("");
            }
            
        }
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-4'>   
                    <div className="padre">
                        <div className="card card-body shadow-lg">
                            <img src={ImagenUserIcon} alt="" className="estilo-profile"/>
                            <form onSubmit={functAutenticacion}>
                                <input type="text" placeholder='Ingresar Email' className='cajatexto' id='email'value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <input type="password" placeholder='Ingresar contraseña' className='cajatexto' id='password'value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <button className='btnform'>{registrando ? "Registrate" : "Inicia sesion"}</button>
                            </form>
                            <h4 className='texto'>
                                {registrando ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
                                    <a
                                        href="#"
                                        className='link'
                                        onClick={(e) => {
                                        e.preventDefault(); 
                                        setRegistrando(!registrando);
                                        }}
                                    >
                                    {registrando ? "Inicia sesion" : "Registrate"}
                                    </a>
                            </h4>

                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                <img src={Imagen} alt="" className='tamaño-imagen' />
                </div>
            </div>
        </div>
    )
}

export default Login
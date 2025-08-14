'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulação de login - substituir pela integração real
    setTimeout(() => {
      if (username && password) {
        localStorage.setItem('vendedor', JSON.stringify({ username, loggedIn: true }));
        router.push('/dashboard');
      } else {
        alert('Por favor, preencha todos os campos');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 flex items-center justify-center p-4 pt-20 relative overflow-hidden">
      {/* Background elegante com gradientes e padrões geométricos aprimorados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Gradiente base mais visível */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100/60 via-blue-100/40 to-gray-200/50"></div>
        
        {/* Camada de textura com padrão de linhas */}
        <div className="absolute inset-0 opacity-[0.08]" style={{backgroundImage: 'repeating-linear-gradient(45deg, #3b82f6 0px, #3b82f6 1px, transparent 1px, transparent 15px)'}}></div>
        <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage: 'repeating-linear-gradient(-45deg, #64748b 0px, #64748b 1px, transparent 1px, transparent 25px)'}}></div>
        
        {/* Elementos geométricos mais visíveis */}
        <div className="absolute top-20 right-20 w-40 h-40 border-2 border-blue-300/30 rotate-45 transform"></div>
        <div className="absolute bottom-32 left-32 w-32 h-32 border-2 border-gray-400/25 rotate-12 transform"></div>
        <div className="absolute top-1/2 left-20 w-24 h-24 border border-slate-400/30 -rotate-45 transform"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 border border-blue-400/25 rotate-30 transform"></div>
        
        {/* Gradientes de canto mais pronunciados */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-bl from-blue-200/20 via-indigo-100/15 to-transparent rounded-full blur-xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-gray-200/20 via-slate-100/15 to-transparent rounded-full blur-xl"></div>
        
        {/* Elementos decorativos adicionais */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-100/10 to-indigo-100/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-l from-slate-100/15 to-gray-100/10 rounded-full blur-xl"></div>
        
        {/* Pontos decorativos mais visíveis */}
        <div className="absolute top-16 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-slate-500/35 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-gray-500/40 rounded-full"></div>
        <div className="absolute bottom-16 right-1/4 w-3 h-3 bg-blue-500/35 rounded-full"></div>
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-indigo-400/30 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-slate-400/35 rounded-full"></div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-20">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto w-40 h-40 relative mb-4">
            <Image
              src="/logo-empresa.png"
              alt="Logo da Empresa"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Sistema de Vendas</h1>
          <p className="text-gray-600">Faça login para continuar</p>
        </div>

        {/* Formulário de Login */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuário"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Problemas para acessar? Entre em contato com o suporte.
          </p>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

// Lista de palabras de 5 letras en español
const WORDS = [
  "CASA", "PERRO", "GATO", "AGUA", "FUEGO",
  "TIERRA", "CIELO", "LUNA", "SOL", "ESTRELLA",
  "FLOR", "ARBOL", "VERDE", "AZUL", "ROJO",
  "NEGRO", "BLANCO", "DULCE", "SALADO", "AMARGO",
  "FELIZ", "TRISTE", "GRANDE", "PEQUEÑO", "RAPIDO",
  "LENTO", "FUERTE", "DEBIL", "CALOR", "FRIO",
  "LIBRO", "MESA", "SILLA", "PUERTA", "VENTANA",
  "COCHE", "AVION", "BARCO", "TREN", "BICI",
  "MUSICA", "BAILE", "CANTO", "RISA", "LLANTO",
  "AMOR", "ODIO", "MIEDO", "VALOR", "HONOR"
]

const getRandomWord = (): string => {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

export const App = (): React.ReactElement => {
  const rows = 6
  const cols = 5
  const [word, setWord] = useState<string>("")
  const [proposals, setProposals] = useState<Array<Array<string>>>(
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => "")
    )
  )

  // Inicializar palabra aleatoria al cargar el componente
  useEffect(() => {
    setWord(getRandomWord())
  }, [])

  const onChangeProposalLetter = (valueLetter: string, rowIndexS: number, colIndexS: number): void => {
    // Solo permitir letras
    if (valueLetter && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]$/.test(valueLetter)) {
      return
    }

    // Convertir a mayúscula
    const upperLetter = valueLetter.toUpperCase()

    setProposals(
      (preValue) => {
        const newProposal = preValue.map(
          (proposalsWord: Array<string>, rowIndex: number) => {
            if (rowIndex !== rowIndexS) {
              return proposalsWord
            }
            return proposalsWord.map(
              (proposalsWordLetter: string, colIndex: number) => {
                if (colIndex === colIndexS) {
                  return upperLetter
                }
                return proposalsWordLetter
              }
            )
          }
        )
        return newProposal
      }
    )

    // Navegación automática solo si se ingresó una letra
    if (upperLetter && colIndexS < cols - 1) {
      const nextInput = document.getElementById(`proposal-${rowIndexS}-${colIndexS + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const onKeyDown = (event: React.KeyboardEvent, rowIndex: number, colIndex: number): void => {
    if (event.key === 'Backspace') {
      // Si la casilla actual está vacía, ir a la anterior
      if (!proposals[rowIndex][colIndex] && colIndex > 0) {
        const prevInput = document.getElementById(`proposal-${rowIndex}-${colIndex - 1}`)
        if (prevInput) {
          prevInput.focus()
        }
      }
    } else if (event.key === 'ArrowLeft' && colIndex > 0) {
      const prevInput = document.getElementById(`proposal-${rowIndex}-${colIndex - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    } else if (event.key === 'ArrowRight' && colIndex < cols - 1) {
      const nextInput = document.getElementById(`proposal-${rowIndex}-${colIndex + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    } else if (event.key === 'ArrowUp' && rowIndex > 0) {
      const upInput = document.getElementById(`proposal-${rowIndex - 1}-${colIndex}`)
      if (upInput) {
        upInput.focus()
      }
    } else if (event.key === 'ArrowDown' && rowIndex < rows - 1) {
      const downInput = document.getElementById(`proposal-${rowIndex + 1}-${colIndex}`)
      if (downInput) {
        downInput.focus()
      }
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-gray-100 p-4'>
      <div className='mb-8 text-center'>
        <h1 className='text-4xl font-bold text-gray-800 mb-2'>WORDLE</h1>
        <p className='text-gray-600'>Adivina la palabra de 5 letras</p>
      </div>
      <div className='grid grid-cols-5 gap-3 p-6 bg-white rounded-lg shadow-lg'>
        {
          proposals.map(
            (proposalsWord: Array<string>, rowIndex: number) => {
              return (
                <>
                  {
                    proposalsWord.map(
                      (proposalsWordLetter: string, colIndex: number) => {
                        return (
                          <input
                            key={`Proposal-${rowIndex}-${colIndex}`}
                            id={`proposal-${rowIndex}-${colIndex}`}
                            className={twMerge(
                              'border-2 border-gray-400 w-16 h-16 bg-white text-black text-2xl font-bold text-center uppercase rounded-md focus:outline-none focus:border-blue-500 transition-colors',
                              (word.includes(proposalsWordLetter) && proposalsWordLetter !== "") ? "bg-yellow-400 text-black border-yellow-500" : "",
                              word[colIndex] === proposalsWordLetter ? "bg-green-500 text-white border-green-600" : ""
                            )}
                            value={proposalsWordLetter}
                            onChange={(event): void => {
                              onChangeProposalLetter(event.target.value, rowIndex, colIndex)
                            }}
                            onKeyDown={(event): void => {
                              onKeyDown(event, rowIndex, colIndex)
                            }}
                            maxLength={1}
                            autoComplete="off"
                            spellCheck={false}
                          />
                        )
                      }
                    )
                  }
                </>
              )
            }
          )
        }
      </div>
    </div>
  )
}

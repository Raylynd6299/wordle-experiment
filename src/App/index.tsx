import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const App = (): React.ReactElement => {
  const rows = 5
  const cols = 5
  const word = "words"
  const [proposals, setProposals] = useState<Array<Array<string>>>(
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => "")
    )
  )

  const onChangeProposalLetter = (valueLetter: string, rowIndexS: number, colIndexS: number): void => {
    if (valueLetter === " ") {
      return
    }
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
                  return valueLetter
                }

                return (
                  proposalsWordLetter
                )
              }
            )
          }
        )
        return (
          newProposal
        )
      }
    )

    //  Next focus
    const colIndexSearch = colIndexS == (word.length - 1) ? 0 : colIndexS + 1
    const rowIndexSearch = colIndexS == (word.length - 1) ? rowIndexS + 1 : rowIndexS
    const nextInput = document.getElementById(`proposal-${rowIndexSearch}-${colIndexSearch}`)

    if (nextInput) {
      nextInput.focus()
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-gray-300 '>
      <div className='grid grid-cols-5 gap-4'>
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
                              'border border-black w-15 h-15 bg-gray-100 text-black text-3xl text-center capitalize',
                              (word.includes(proposalsWordLetter) && proposalsWordLetter !== "") ? "bg-yellow-300 text-black" : "",
                              word[colIndex] === proposalsWordLetter ? "bg-blue-700 text-white" : ""
                            )}
                            value={proposalsWordLetter}
                            onChange={(event): void => {
                              onChangeProposalLetter(event.target.value, rowIndex, colIndex)
                            }}
                            maxLength={1}
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
import { LexoRank } from 'lexorank'

export interface IHasRank {
  rank: string
}

export const sortByLexoRankAsc = (
  data: Array<Record<string, any> & IHasRank>
) => {
  return data.sort((a: IHasRank, b: IHasRank) => {
    if (!a.rank && b.rank) {
      return -1
    }
    if (a.rank && !b.rank) {
      return 1
    }

    if (!a.rank || !b.rank) {
      return 0
    }
    return a.rank.localeCompare(b.rank)
  })
}

export const evalLexoRank = (old: LexoRank) => {
  return old.isMax()
    ? old.inNextBucket()
    : old.isMin()
    ? old.inPrevBucket()
    : old
}

export const calLexoRank = (
  prev_rank: string | undefined,
  next_rank: string | undefined
) => {
  try {
    const prev = prev_rank && LexoRank.parse(prev_rank)
    const next = next_rank && LexoRank.parse(next_rank)

    if (prev && next) {
      return prev.between(next)
    }
    if (prev) {
      return evalLexoRank(prev).genNext()
    }
    if (next) {
      return evalLexoRank(next).genPrev()
    }

    return LexoRank.middle()
  } catch (err) {
    throw Error('Failed to calculate rank')
  }
}

import api from './api'

export interface Commentaire {
  id: number
  auteur: string
  date: string
  contenu: string
}

export interface Candidature {
  id: number
  nom: string
  poste: string
  statut: string
  competences: string[]
  experience: string
  dateCandidature: string
  email: string
  telephone: string
  cv: string
  lettreMotivation: string
  salaireSouhaite: number
  disponibilite: string
  localisation: string
  commentaires: Commentaire[]
}

export const candidateService = {
  async getAll(params: any = {}) {
    // Filter out empty strings to avoid json-server filtering by them
    const cleanParams = Object.entries(params).reduce((acc: any, [key, value]) => {
      // Only exclude truly empty values, not falsy ones like 0
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value
      }
      return acc
    }, {})
    
    const { data } = await api.get<any>('/candidatures', { params: cleanParams })
    return data
  },

  async getById(id: number) {
    const { data } = await api.get<Candidature>(`/candidatures/${id}`)
    return data
  },

  async update(id: number, payload: Partial<Candidature>) {
    const { data } = await api.patch<Candidature>(`/candidatures/${id}`, payload)
    return data
  },

  async create(payload: Omit<Candidature, 'id' | 'commentaires'>) {
    const { data } = await api.post<Candidature>('/candidatures', {
      ...payload,
      commentaires: []
    })
    return data
  },

  async addComment(candidateId: number, comment: Omit<Commentaire, 'id'>) {
    const candidate = await this.getById(candidateId)
    const newComment = {
      ...comment,
      id: Date.now()
    }
    const updatedCommentaires = [...(candidate.commentaires || []), newComment]
    const { data } = await api.patch<Candidature>(`/candidatures/${candidateId}`, {
      commentaires: updatedCommentaires
    })
    return data
  },

  async getStatuts() {
    const { data } = await api.get<string[]>('/statuts')
    return data
  },

  async getPostes() {
    const { data } = await api.get<string[]>('/postes')
    return data
  }
}

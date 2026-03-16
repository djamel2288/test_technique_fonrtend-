import { defineStore } from 'pinia'
import { candidateService, type Candidature } from '@/services/candidateService'

export const useCandidateStore = defineStore('candidates', {
  state: () => ({
    candidates: [] as Candidature[],
    dashboardCandidates: [] as Candidature[], // Dedicated state for KPIs
    statuts: [] as string[],
    postes: [] as string[],
    loading: false,
    error: null as string | null,
    totalCount: 0,
    filters: {
      q: '', // Global search parameter for My JSON Server
      statut: localStorage.getItem('recruit_filter_statut') || '',
      poste: localStorage.getItem('recruit_filter_poste') || '',
      dateCandidature_gte: '', // Start date
      dateCandidature_lte: '', // End date
      competences_like: '', // Skills filter
      _page: 1,
      _per_page: 10,
      _sort: '-dateCandidature'
    } as Record<string, any>
  }),

  actions: {
    async fetchCandidates() {
      this.loading = true
      this.error = null
      try {
        const response = await candidateService.getAll(this.filters)
        this.candidates = Array.isArray(response) ? response : (response as any).data || []
        
        if ((response as any).items !== undefined) {
          this.totalCount = (response as any).items
        }
      } catch (err: any) {
        this.error = "Erreur lors du chargement des candidatures"
      } finally {
        this.loading = false
      }
    },

    async fetchMetadata() {
      try {
        const [statutsRaw, postesRaw] = await Promise.all([
          candidateService.getStatuts(),
          candidateService.getPostes()
        ])
        this.statuts = (statutsRaw as any[]).map(s => s.nom || s)
        this.postes = (postesRaw as any[]).map(p => p.titre || p)
      } catch (err) {
        console.error("Metadata fetch error", err)
      }
    },

    setFilter(key: string, value: any) {
      this.filters[key] = value
      // Persist specific filters for UX
      if (['statut', 'poste'].includes(key)) {
        localStorage.setItem(`recruit_filter_${key}`, value)
      }
      this.filters._page = 1
      this.fetchCandidates()
    },

    async createCandidate(candidate: any) {
      this.loading = true
      try {
        const newCandidate = await candidateService.create(candidate)
        await this.fetchCandidates()
        return newCandidate
      } catch (err) {
        this.error = "Erreur lors de la création du candidat"
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateStatus(id: number, statut: string) {
      const index = this.candidates.findIndex(c => c.id === id)
      if (index === -1) return
      
      const oldStatus = this.candidates[index].statut
      this.candidates[index].statut = statut

      try {
        await candidateService.update(id, { statut })
      } catch (err) {
        this.candidates[index].statut = oldStatus
        this.error = "Erreur lors de la mise à jour du statut"
      }
    },

    async addComment(id: number, content: string) {
      try {
        const updated = await candidateService.addComment(id, {
          auteur: 'Recruteur',
          date: new Date().toISOString(),
          contenu: content
        })
        
        // Update local state
        const index = this.candidates.findIndex(c => c.id === id)
        if (index !== -1) {
          this.candidates[index] = updated
        }
        return updated
      } catch (err) {
        this.error = "Erreur lors de l'ajout du commentaire"
        throw err
      }
    },

    async fetchDashboardData() {
      this.loading = true
      try {
        const response = await candidateService.getAll({}) // Fetch all candidates without filters
        this.dashboardCandidates = Array.isArray(response) ? response : (response as any).data || []
      } catch (err) {
        console.error("Erreur lors du chargement des statistiques du tableau de bord", err)
      } finally {
        this.loading = false
      }
    }
  }
})

import { describe, it, expect, vi } from 'vitest'
import { candidateService } from '../services/candidateService'
import axios from 'axios'

// Mock axios for service layer tests
vi.mock('axios')

describe('CandidateService', () => {
  it('should have basic CRUD methods defined', () => {
    expect(candidateService.getAll).toBeDefined()
    expect(candidateService.getById).toBeDefined()
    expect(candidateService.update).toBeDefined()
  })

  it('fetch candidates with correct params', async () => {
    const mockData = [{ id: 1, nom: 'Test User' }]
    vi.mocked(axios.get).mockResolvedValue({ data: mockData })

    const result = await candidateService.getAll({ q: 'test' })
    
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/candidatures'), expect.anything())
    expect(result).toEqual(mockData)
  })
})

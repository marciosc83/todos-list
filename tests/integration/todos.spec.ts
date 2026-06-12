import { test, expect, request } from '@playwright/test'
import dotenv from 'dotenv'
import { Api } from '../../support/api';
dotenv.config()

/**
 * ToDo Item structure definition
 */
interface ToDoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

/**
 * Validating the Success Status Code - Method GET returns 200
 */
test('Should have a valid Success Status Code', async () => {
  const api = new Api(request, process.env.BASE_URL)
  const response = await api.getAPIResponse()
  expect(response.ok()).toBeTruthy()
})

/**Validating the quantity of items returned by the API. 
 * For testing purposes, the correct quantity is 200 items 
 */
test('Should return the correct quantity of ToDo items', async () => {
  const api = new Api(request, process.env.BASE_URL)
  const response = await api.getAPIResponse()
  const todoItems = JSON.stringify(await response.json())
  const itemsArray = JSON.parse(todoItems)

  expect(itemsArray.length).toBeGreaterThanOrEqual(200)
})

/**
 * Validating that the Items IDs are unique 
 */
test('Should have ToDo items with unique IDs', async () => {
  const api = new Api(request, process.env.BASE_URL)
  const response = await api.getAPIResponse()
  const todoItems = JSON.stringify(await response.json())
  const itemsArray = JSON.parse(todoItems)
  const itemsIds = itemsArray.map((item: ToDoItem) => item.id)
  const ids = new Set(itemsIds)

  expect(itemsIds.length).toBe(ids.size)
})

/**
 * Validating the format of the ToDo items information 
 */

test('Should have ToDo items with all information in the correct format', async () => {
  const api = new Api(request, process.env.BASE_URL)
  const response = await api.getAPIResponse()
  const todoItems = JSON.stringify(await response.json())
  const itemsArray = JSON.parse(todoItems)

  itemsArray.forEach((item: ToDoItem) => {
    expect(typeof item.userId).toBe('number')
    expect(typeof item.id).toBe('number')
    expect(typeof item.title).toBe('string')
    expect(typeof item.completed).toBe('boolean')
  })
})

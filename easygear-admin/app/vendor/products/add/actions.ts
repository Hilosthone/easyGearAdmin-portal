'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const API_BASE_URL = 'https://api.easygear.ng/api/v1'

export async function publishProduct(formData: any) {
  // 1. You MUST replace this with a real token or it will 401/403
  const token = 'YOUR_ACTUAL_TOKEN'

  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: formData.title,
        sku: formData.sku,
        description: formData.description,
        // Ensure keys match what the API expects (e.g., label/quantity)
        variants: formData.variants.map((v: any) => ({
          label: v.name, // Changed from 'name' to 'label'
          price: parseFloat(v.price),
          quantity: parseInt(v.stock), // Changed from 'stock' to 'quantity'
        })),
        image_urls: formData.images || [], // Ensure this matches API key
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      // Return the error instead of throwing inside try/catch if you want to show it in UI
      return { error: errorData.message || 'Failed to publish product' }
    }

    revalidatePath('/vendor/inventory') // Match your actual route
  } catch (error) {
    console.error('API Error:', error)
    return { error: 'Node Connection Failed' }
  }

  // 3. ALWAYS redirect OUTSIDE the try/catch block
  redirect('/vendor/inventory')
}
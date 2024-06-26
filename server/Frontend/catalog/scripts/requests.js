﻿


export async function getAllProducts() {
    try {
        const response = await fetch('/api/catalog/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'}
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const results = await response.json();
        console.log(results);
        return results;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}
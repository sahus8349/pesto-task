<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tests\Helper;
use App\Models\Task;

class TaskApisTest extends TestCase
{
    use RefreshDatabase, Helper; // Use database migrations for testing

    /**
     * Test retrieving a list of all items.
     *
     * @return void
     */
    public function testRetrieveAllItems()
    {
        $response = $this->withHeaders($this->getHeadres())->get('/api/tasks');
        $response->assertJsonStructure([
            'status',
            'message'
        ]);
    }

    /**
     * Test retrieving a specific item by ID.
     *
     * @return void
     */
    public function testRetrieveItemById()
    {
        $item = Task::factory()->create();

        $response = $this->withHeaders($this->getHeadres())->get("/api/tasks/{$item->id}");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data',
        ]);
    }

    /**
     * Test creating a new item.
     *
     * @return void
     */
    public function testCreateItem()
    {
        $data = [
            'title' => 'New Item',
            'description' => 'Description of the new item',
            'status' => 'To_Do',
        ];

        $response = $this->withHeaders($this->getHeadres())->post('/api/tasks', $data);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data',
        ]);
    }

    /**
     * Test updating an existing item.
     *
     * @return void
     */
    public function testUpdateItem()
    {
        $data = [
            'title' => 'Updated Item',
            'description' => 'Updated description of the item',
            'status' => 'IN_PROGRESS'
        ];

        $item = Task::factory()->create();

        $response = $this->withHeaders($this->getHeadres())->put("/api/tasks/{$item->id}", $data);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data',
        ]);
    }

    /**
     * Test deleting an item.
     *
     * @return void
     */
    public function testDeleteItem()
    {
        $item = Task::factory()->create();

        $response = $this->withHeaders($this->getHeadres())->delete("/api/tasks/{$item->id}");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
        ]);
    }

    /**
     * Test deleting an item.
     *
     * @return void
     */
    public function testGetEnums()
    {
        $item = Task::factory()->create();

        $response = $this->withHeaders($this->getHeadres())->get("/api/tasksEnums");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data',
        ]);
    }
}

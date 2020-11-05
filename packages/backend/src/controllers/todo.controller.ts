import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from "@loopback/repository";
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from "@loopback/rest";
import { Todo } from "../models";
import { TodoRepository } from "../repositories";
import { authenticate } from "@loopback/authentication";

@authenticate("jwt")
export class TodoController {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
  ) {}

  @post("/todos", {
    responses: {
      "200": {
        description: "Todo model instance",
        content: { "application/json": { schema: getModelSchemaRef(Todo) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Todo, {
            title: "NewTodo",
            exclude: ["id"],
          }),
        },
      },
    })
    todo: Omit<Todo, "id">,
  ): Promise<Todo> {
    return this.todoRepository.create(todo);
  }

  @get("/todos/count", {
    responses: {
      "200": {
        description: "Todo model count",
        content: { "application/json": { schema: CountSchema } },
      },
    },
  })
  async count(@param.where(Todo) where?: Where<Todo>): Promise<Count> {
    return this.todoRepository.count(where);
  }

  @get("/todos", {
    responses: {
      "200": {
        description: "Array of Todo model instances",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: getModelSchemaRef(Todo, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Todo) filter?: Filter<Todo>): Promise<Todo[]> {
    return this.todoRepository.find(filter);
  }

  @patch("/todos", {
    responses: {
      "200": {
        description: "Todo PATCH success count",
        content: { "application/json": { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Todo, { partial: true }),
        },
      },
    })
    todo: Todo,
    @param.where(Todo) where?: Where<Todo>,
  ): Promise<Count> {
    return this.todoRepository.updateAll(todo, where);
  }

  @get("/todos/{id}", {
    responses: {
      "200": {
        description: "Todo model instance",
        content: {
          "application/json": {
            schema: getModelSchemaRef(Todo, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string("id") id: string,
    @param.filter(Todo, { exclude: "where" })
    filter?: FilterExcludingWhere<Todo>,
  ): Promise<Todo> {
    return this.todoRepository.findById(id, filter);
  }

  @patch("/todos/{id}", {
    responses: {
      "204": {
        description: "Todo PATCH success",
      },
    },
  })
  async updateById(
    @param.path.string("id") id: string,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Todo, { partial: true }),
        },
      },
    })
    todo: Partial<Todo>,
  ): Promise<void> {
    await this.todoRepository.updateById(id, todo);
  }

  @put("/todos/{id}", {
    responses: {
      "204": {
        description: "Todo PUT success",
      },
    },
  })
  async replaceById(
    @param.path.string("id") id: string,
    @requestBody() todo: Todo,
  ): Promise<void> {
    console.info({ todo });
    await this.todoRepository.replaceById(id, todo);
  }

  @del("/todos/{id}", {
    responses: {
      "204": {
        description: "Todo DELETE success",
      },
    },
  })
  async deleteById(@param.path.string("id") id: string): Promise<void> {
    await this.todoRepository.deleteById(id);
  }
}

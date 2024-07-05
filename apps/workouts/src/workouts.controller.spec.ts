import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';

describe('WorkoutsController', () => {
  let workoutsController: WorkoutsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsController],
      providers: [WorkoutsService],
    }).compile();

    workoutsController = app.get<WorkoutsController>(WorkoutsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(workoutsController.getHello()).toBe('Hello World!');
    });
  });
});

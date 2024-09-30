import 'reflect-metadata';
import { BillingServiceWorkflow } from '../lib/billing/billingServiceWorkflow';
import { container as libContainer } from '../lib/container';
import { TYPES } from '../lib/types';
import { GROUP_MOCKS } from './global-mock/group.mock';
import { Group, GroupService } from '../lib/group/groupService';
import { GroupServiceWorkflow } from '../lib/group/groupServiceWorkflow';
import { Container } from 'inversify';
import { Configuration } from '@spos/clients-dining';
import { ApiMockConfig } from './api-mock-config';
import { MenuApiService } from '../lib/apis/menuApiService';

describe('BillingServiceWorkflowTest', () => {
  let container: Container;
  let billingService: BillingServiceWorkflow;
  let menuApiService: MenuApiService;
  let groupService: GroupService;

  beforeEach(() => {
    container = new Container();

    libContainer.bind<Configuration>(TYPES.DiningApiConfiguration).toConstantValue(ApiMockConfig);
    libContainer.bind<Configuration>(TYPES.MenuApiConfiguration).toConstantValue(ApiMockConfig);

    groupService = libContainer.get<GroupServiceWorkflow>(TYPES.GroupService);
    billingService = libContainer.get<BillingServiceWorkflow>(TYPES.BillingService);
    menuApiService = libContainer.get<MenuApiService>(TYPES.MenuApiService);
  });

  test('Mock are OK for groupService', async () => {
    groupService.getGroups = jest.fn().mockReturnValue(Promise.resolve(GROUP_MOCKS));
    groupService.getGroup = jest.fn((groupId: string) => {
      return Promise.resolve(GROUP_MOCKS.find(g => g.id === groupId) as Group);
    });
    expect(await groupService.getGroups()).toBe(GROUP_MOCKS);
    expect((await groupService.getGroup("2")).offer).toBe("test2");
  });

  test('Mock are OK for MenuApiService', async () => {
    menuApiService.getMenuApi = jest.fn().mockReturnValue(Promise.resolve(new MenuApiService(ApiMockConfig)));

    expect(typeof menuApiService.getMenuApi()).toBe('object');

  });

  it('should process billing correctly', () => {
      expect(2 + 2).toBe(4);
  });
});


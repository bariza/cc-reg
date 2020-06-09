import { Subject, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Store } from '@ngrx/store';

export function mockStore<T>(
    {
    actions = new Subject<Action>(),
    states = new Subject<T>()
  }: {
    actions?: Subject<Action>,
    states?: Subject<T>
  }): Store<T> {
  
    let result = states as any;
    result.dispatch = (action: Action) => actions.next(action);
    result.select = (s) => of({});
    result.setState = (n) => of({});
  
    
    return result;
  }
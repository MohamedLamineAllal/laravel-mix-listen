import mix from 'laravel-mix';
import { Component } from 'laravel-mix/src/components/Component';
import DumpWebpackConfig from 'laravel-mix/src/components/DumpWebpackConfig';

const dumpWebpackConfigComponent = new DumpWebpackConfig(mix);

type Handler = (...args: any) => void | Promise<void>;

class Listen extends Component {
  public register(event: string, callback: Handler): void {
    this.context.listen(event, (...args: any[]) => {
      callback(...args, dumpWebpackConfigComponent.circularStringify);
    });
  }
}

mix.extend('listen', Listen as any);

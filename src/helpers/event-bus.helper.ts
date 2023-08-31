import { IEventBus, ILogger } from "@/infrastructure/interfaces";
import { injectable } from "inversify";
import "reflect-metadata";
import { inject } from "inversify";
import { TYPES } from "@/infrastructure/types";
type Callback = (data: any) => void;
@injectable()
class EventBus implements IEventBus {
  private eventMap: Map<string, Callback[]>;

  constructor(@inject(TYPES.Logger) private logger: ILogger) {
    this.eventMap = new Map();
    this.logger = logger;
  }

  /**
   * Subscribes a callback to an event.
   * @param event - The event to subscribe to.
   * @param callback - The callback to execute when the event is emitted.
   * @returns Whether the subscription was successful.
   */
  subscribe(event: string, callback: Callback): boolean {
    try {
      if (!this.eventMap.has(event)) {
        this.eventMap.set(event, []);
      }
      const callbackList = this.eventMap.get(event);
      if (callbackList!.includes(callback)) {
        throw new Error("Callback is already subscribed to this event");
      }
      callbackList!.push(callback);
      this.logger.info(`Subscribed to event: ${event}`);
      return true;
    } catch (err) {
      const error = err as Error;
      this.logger.error(
        `[${event}] Error while subscribing: ${error.message}`,
        {
          message: error.message,
          stack: error.stack,
          name: error.name,
        }
      );
      throw error;
    }
  }

  /**
   * Unsubscribes a callback from an event.
   * @param event - The event to unsubscribe from.
   * @param callback - The callback to remove.
   * @returns Whether the unsubscription was successful.
   */
  unsubscribe(event: string, callback: Callback): boolean {
    try {
      if (this.eventMap.has(event)) {
        const callbackList = this.eventMap.get(event);
        const index = callbackList!.indexOf(callback);
        if (index === -1) {
          throw new Error("Callback is not subscribed to this event");
        }
        callbackList!.splice(index, 1);
        this.logger.info(`Unsubscribed from event: ${event}`);
        return true;
      }
      throw new Error("Event does not exist");
    } catch (err) {
      const error = err as Error;
      this.logger.error(
        `[${event}] Error while unsubscribing: ${error.message}`,
        {
          message: error.message,
          stack: error.stack,
          name: error.name,
        }
      );
      throw error;
    }
  }

  /**
   * Emits an event, calling all subscribed callbacks with the provided data.
   * @param event - The event to emit.
   * @param data - The data to pass to the callbacks.
   */
  emit(event: string, data: any): void {
    try {
      if (this.eventMap.has(event)) {
        this.eventMap.get(event)!.forEach((callback) => callback(data));
        this.logger.info(`Emitted event: ${event}`);
      } else {
        throw new Error("Event does not exist");
      }
    } catch (err) {
      const error = err as Error;
      this.logger.error(`[${event}] Error while emitting: ${error.message}`, {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
      throw error;
    }
  }
}

export default EventBus;

import CallOptions from '../CallOptions';
import { ExecutionPathOptions } from '../ExecutionPathOptions';
import {
	arrayMembers,
	getMemberReturnExpressionWhenCalled,
	hasMemberEffectWhenCalled,
	ObjectPath,
	UNKNOWN_EXPRESSION
} from '../values';
import * as NodeType from './NodeType';
import { ExpressionNode, NodeBase } from './shared/Node';
import SpreadElement from './SpreadElement';

export default class ArrayExpression extends NodeBase {
	type: NodeType.tArrayExpression;
	elements: (ExpressionNode | SpreadElement | null)[];

	getReturnExpressionWhenCalledAtPath(path: ObjectPath) {
		if (path.length !== 1) return UNKNOWN_EXPRESSION;
		return getMemberReturnExpressionWhenCalled(arrayMembers, path[0]);
	}

	hasEffectsWhenAccessedAtPath(path: ObjectPath) {
		return path.length > 1;
	}

	hasEffectsWhenCalledAtPath(
		path: ObjectPath,
		callOptions: CallOptions,
		options: ExecutionPathOptions
	): boolean {
		if (path.length === 1) {
			return hasMemberEffectWhenCalled(arrayMembers, path[0], this.included, callOptions, options);
		}
		return true;
	}
}

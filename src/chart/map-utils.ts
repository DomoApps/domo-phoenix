export function _isMap(type: string): boolean {
  return /badge_world_map|badge_map.*/.exec(type) != null;
}
